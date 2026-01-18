// Client-side Stripe configuration
// We use Stripe Payment Links for the static site implementation

export const PAYMENT_LINKS = {
    creator: {
        monthly: "https://buy.stripe.com/test_creator_monthly", // Replace with your actual Stripe Payment Link
        annual: "https://buy.stripe.com/test_creator_annual",   // Replace with your actual Stripe Payment Link
    },
    pro: {
        monthly: "https://buy.stripe.com/test_pro_monthly",
        annual: "https://buy.stripe.com/test_pro_annual",
    },
    agency: {
        monthly: "https://buy.stripe.com/test_agency_monthly",
        annual: "https://buy.stripe.com/test_agency_annual",
    },
} as const;

/**
 * Plan metadata for display
 */
export const PLANS = {
    creator: {
        id: 'creator',
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
        id: 'pro',
        name: 'Pro',
        description: 'The complete creator business OS',
        priceMonthly: 49,
        priceAnnual: 39,
        popular: true,
        features: [
            'Everything in Creator',
            'Unlimited deals',
            'Digital products (3% fee)',
            '5,000 email subscribers',
            'Priority support',
        ],
    },
    agency: {
        id: 'agency',
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
 * Get the Stripe Payment Link for a plan and billing interval
 */
export function getPaymentLink(plan: PlanId, interval: BillingInterval): string {
    return PAYMENT_LINKS[plan][interval];
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
