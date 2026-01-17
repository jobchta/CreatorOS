import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/webhooks/stripe
 * Handles Stripe webhook events for subscription lifecycle
 */
export async function POST(request: NextRequest) {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'Missing stripe-signature header' },
            { status: 400 }
        );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        console.error('Missing STRIPE_WEBHOOK_SECRET');
        return NextResponse.json(
            { error: 'Webhook not configured' },
            { status: 500 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json(
            { error: 'Invalid signature' },
            { status: 400 }
        );
    }

    const supabase = await createClient();

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;

                // Get subscription details
                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                );

                const userId = subscription.metadata.user_id;
                const plan = subscription.metadata.plan;
                const interval = subscription.metadata.interval;

                if (userId) {
                    // Update user profile with subscription info
                    await supabase
                        .from('profiles')
                        .update({
                            subscription_status: 'active',
                            subscription_plan: plan,
                            subscription_interval: interval,
                            stripe_subscription_id: subscription.id,
                            subscription_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                        })
                        .eq('id', userId);

                    // Log to event stream
                    await supabase.from('event_stream').insert({
                        user_id: userId,
                        event_type: 'subscription_created',
                        payload: {
                            plan,
                            interval,
                            subscription_id: subscription.id,
                            amount: session.amount_total,
                        },
                    });
                }
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                const userId = subscription.metadata.user_id;

                if (userId) {
                    await supabase
                        .from('profiles')
                        .update({
                            subscription_status: subscription.status,
                            subscription_plan: subscription.metadata.plan,
                            subscription_interval: subscription.metadata.interval,
                            subscription_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                        })
                        .eq('id', userId);

                    // Log to event stream
                    await supabase.from('event_stream').insert({
                        user_id: userId,
                        event_type: 'subscription_updated',
                        payload: {
                            status: subscription.status,
                            plan: subscription.metadata.plan,
                        },
                    });
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const userId = subscription.metadata.user_id;

                if (userId) {
                    await supabase
                        .from('profiles')
                        .update({
                            subscription_status: 'canceled',
                            subscription_plan: null,
                            subscription_interval: null,
                            stripe_subscription_id: null,
                        })
                        .eq('id', userId);

                    // Log to event stream
                    await supabase.from('event_stream').insert({
                        user_id: userId,
                        event_type: 'subscription_canceled',
                        payload: {
                            subscription_id: subscription.id,
                        },
                    });
                }
                break;
            }

            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as Stripe.Invoice;

                if (invoice.subscription) {
                    const subscription = await stripe.subscriptions.retrieve(
                        invoice.subscription as string
                    );
                    const userId = subscription.metadata.user_id;

                    if (userId) {
                        // Log payment to event stream
                        await supabase.from('event_stream').insert({
                            user_id: userId,
                            event_type: 'payment_succeeded',
                            payload: {
                                amount: invoice.amount_paid,
                                invoice_id: invoice.id,
                            },
                        });
                    }
                }
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;

                if (invoice.subscription) {
                    const subscription = await stripe.subscriptions.retrieve(
                        invoice.subscription as string
                    );
                    const userId = subscription.metadata.user_id;

                    if (userId) {
                        await supabase
                            .from('profiles')
                            .update({
                                subscription_status: 'past_due',
                            })
                            .eq('id', userId);

                        // Log failed payment
                        await supabase.from('event_stream').insert({
                            user_id: userId,
                            event_type: 'payment_failed',
                            payload: {
                                amount: invoice.amount_due,
                                invoice_id: invoice.id,
                            },
                        });
                    }
                }
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });

    } catch (error) {
        console.error('Webhook handler error:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}

// Disable body parsing for webhook
export const config = {
    api: {
        bodyParser: false,
    },
};
