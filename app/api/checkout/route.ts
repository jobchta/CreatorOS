import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { stripe, getPriceId, type PlanId, type BillingInterval } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

/**
 * Request body schema
 */
const CheckoutRequestSchema = z.object({
    plan: z.enum(['creator', 'pro', 'agency']),
    interval: z.enum(['monthly', 'annual']),
});

/**
 * POST /api/checkout
 * Creates a Stripe Checkout session for subscription
 */
export async function POST(request: NextRequest) {
    try {
        // 1. Parse and validate request body
        const body = await request.json();
        const validationResult = CheckoutRequestSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: 'Invalid request body' },
                { status: 400 }
            );
        }

        const { plan, interval } = validationResult.data;

        // 2. Check if Stripe is configured
        if (!process.env.STRIPE_SECRET_KEY) {
            return NextResponse.json(
                { error: 'Payment system not configured' },
                { status: 500 }
            );
        }

        // 3. Get current user
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        // 4. Get or create Stripe customer
        let customerId: string | undefined;

        if (user) {
            // Check if user has a Stripe customer ID
            const { data: profile } = await supabase
                .from('profiles')
                .select('stripe_customer_id')
                .eq('id', user.id)
                .single();

            if (profile?.stripe_customer_id) {
                customerId = profile.stripe_customer_id;
            } else {
                // Create new Stripe customer
                const customer = await stripe.customers.create({
                    email: user.email,
                    metadata: {
                        supabase_user_id: user.id,
                    },
                });
                customerId = customer.id;

                // Save customer ID to profile
                await supabase
                    .from('profiles')
                    .update({ stripe_customer_id: customer.id })
                    .eq('id', user.id);
            }
        }

        // 5. Get price ID
        const priceId = getPriceId(plan as PlanId, interval as BillingInterval);

        if (!priceId) {
            return NextResponse.json(
                { error: 'Invalid plan configuration' },
                { status: 500 }
            );
        }

        // 6. Create Checkout session
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            customer: customerId,
            customer_email: user ? undefined : undefined, // Let them enter email if not logged in
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing?canceled=true`,
            subscription_data: {
                metadata: {
                    plan,
                    interval,
                    user_id: user?.id || '',
                },
            },
            allow_promotion_codes: true,
        });

        // 7. Return session URL
        return NextResponse.json({
            url: session.url,
            sessionId: session.id,
        });

    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
