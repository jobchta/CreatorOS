import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/portal
 * Creates a Stripe Customer Portal session for subscription management
 */
export async function POST(request: NextRequest) {
    try {
        // 1. Get current user
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // 2. Get Stripe customer ID from profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('stripe_customer_id')
            .eq('id', user.id)
            .single();

        if (!profile?.stripe_customer_id) {
            return NextResponse.json(
                { error: 'No subscription found' },
                { status: 400 }
            );
        }

        // 3. Create portal session
        const session = await stripe.billingPortal.sessions.create({
            customer: profile.stripe_customer_id,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`,
        });

        // 4. Return portal URL
        return NextResponse.json({
            url: session.url,
        });

    } catch (error) {
        console.error('Portal error:', error);
        return NextResponse.json(
            { error: 'Failed to create portal session' },
            { status: 500 }
        );
    }
}
