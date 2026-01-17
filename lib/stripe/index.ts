import Stripe from 'stripe';

/**
 * Initialize Stripe client
 * Uses the secret key from environment variables
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
    typescript: true,
});

/**
 * Price IDs for each subscription tier
 * These should match the price IDs created in your Stripe dashboard
 */
export const PRICE_IDS = {
    creator: {
        monthly: process.env.STRIPE_PRICE_CREATOR_MONTHLY!,
        annual: process.env.STRIPE_PRICE_CREATOR_ANNUAL!,
    },
    pro: {
        monthly: process.env.STRIPE_PRICE_PRO_MONTHLY!,
        annual: process.env.STRIPE_PRICE_PRO_ANNUAL!,
    },
    agency: {
        monthly: process.env.STRIPE_PRICE_AGENCY_MONTHLY!,
        annual: process.env.STRIPE_PRICE_AGENCY_ANNUAL!,
    },
} as const;

/**
 * Plan metadata for display
 */
export const PLANS = {
    creator: {
        name: 'Creator',
        description: 'For creators ready to monetize',
        priceMonthly: 19,
        priceAnnual: 15,
        features: [
            'Unlimited media kits',
            'Premium rate reports',
            'Deal pipeline (10 deals)',
            'Invoice generator',
            'Unlimited AI captions',
        ],
    },
    pro: {
        name: 'Pro',
        description: 'The complete creator business OS',
        priceMonthly: 49,
        priceAnnual: 39,
        features: [
            'Everything in Creator',
            'Unlimited deals',
            'Digital products (3% fee)',
            '5,000 email subscribers',
            'Priority support',
        ],
    },
    agency: {
        name: 'Agency',
        description: 'For teams managing multiple creators',
        priceMonthly: 199,
        priceAnnual: 159,
        features: [
            'Everything in Pro',
            '10 creator accounts',
            'White-label options',
            'Unlimited email subscribers',
            '2% product fee',
        ],
    },
} as const;

export type PlanId = keyof typeof PLANS;
export type BillingInterval = 'monthly' | 'annual';

/**
 * Get the Stripe price ID for a plan and billing interval
 */
export function getPriceId(plan: PlanId, interval: BillingInterval): string {
    return PRICE_IDS[plan][interval];
}

/**
 * Format price for display
 */
export function formatPrice(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(amount);
}
