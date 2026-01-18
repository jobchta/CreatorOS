// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import Stripe from "https://esm.sh/stripe@14.14.0?target=deno"

console.log("Stripe Webhook Function Started")

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
    apiVersion: "2023-10-16",
    httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (req) => {
    try {
        const signature = req.headers.get("Stripe-Signature")

        if (!signature) {
            return new Response("Missing Stripe-Signature", { status: 400 })
        }

        const body = await req.text()
        const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")

        let event
        try {
            event = await stripe.webhooks.constructEventAsync(
                body,
                signature,
                webhookSecret ?? "",
                undefined,
                cryptoProvider
            )
        } catch (err) {
            console.error(`Webhook signature verification failed: ${err.message}`)
            return new Response(err.message, { status: 400 })
        }

        console.log(`Received event: ${event.type}`)

        const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? ""
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Handle the event
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object
                const subscriptionId = session.subscription

                if (subscriptionId) {
                    const subscription = await stripe.subscriptions.retrieve(subscriptionId as string)

                    // Strategy: 
                    // 1. Check client_reference_id (set by our frontend)
                    // 2. Fallback to matching matching email

                    let userId = session.client_reference_id

                    if (!userId) {
                        const email = session.customer_details?.email || session.customer_email

                        if (email) {
                            // Search for user by email in profiles is not direct since auth.users has email usually.
                            // However, we can't query auth.users easily without admin.
                            // But we can check if we can query profiles if we trust that profiles are created on signup.
                            // Let's assume we can't easily find ID by email in 'profiles' unless we added 'email' column there too.
                            // (We haven't added email to profiles schema, so this fallback is weak).
                            // We will rely heavily on client_reference_id.
                            console.log(`No client_reference_id found for email: ${email}`)
                        }
                    }

                    if (userId) {
                        console.log(`Updating subscription for user: ${userId}`)
                        // Update profile
                        const { error } = await supabase.from("profiles").update({
                            subscription_status: "active",
                            stripe_subscription_id: subscriptionId,
                            stripe_customer_id: session.customer as string,
                            subscription_plan: subscription.metadata?.plan_id || "pro", // TODO: Ensure Stripe Price Metadata has plan_id
                            subscription_interval: subscription.items.data[0]?.plan.interval,
                            subscription_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                        }).eq("id", userId)

                        if (error) {
                            console.error("Error updating profile:", error)
                        }
                    } else {
                        console.error("Could not associate payment with a user ID")
                    }
                }
                break
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object
                // We need to find the user. 
                // Option 1: Search profiles by stripe_subscription_id (Best)

                const { data: profiles, error } = await supabase
                    .from("profiles")
                    .select("id")
                    .eq("stripe_subscription_id", subscription.id)
                    .single()

                if (profiles) {
                    await supabase.from("profiles").update({
                        subscription_status: subscription.status,
                        subscription_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                    }).eq("id", profiles.id)
                }
                break
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object

                const { data: profiles } = await supabase
                    .from("profiles")
                    .select("id")
                    .eq("stripe_subscription_id", subscription.id)
                    .single()

                if (profiles) {
                    await supabase.from("profiles").update({
                        subscription_status: "canceled",
                        subscription_plan: "free",
                    }).eq("id", profiles.id)
                }
                break
            }
        }

        return new Response(JSON.stringify({ received: true }), {
            headers: { "Content-Type": "application/json" },
        })

    } catch (err) {
        console.error(err)
        return new Response(err.message, { status: 500 })
    }
})
