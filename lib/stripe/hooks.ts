'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UseCheckoutOptions {
    plan: 'creator' | 'pro' | 'agency';
    interval: 'monthly' | 'annual';
}

interface UseCheckoutReturn {
    checkout: () => Promise<void>;
    loading: boolean;
    error: string | null;
}

/**
 * Hook for initiating Stripe checkout
 */
export function useCheckout({ plan, interval }: UseCheckoutOptions): UseCheckoutReturn {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkout = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ plan, interval }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create checkout session');
            }

            // Redirect to Stripe Checkout
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Checkout failed';
            setError(message);
            setLoading(false);
        }
    };

    return { checkout, loading, error };
}

/**
 * Hook for opening customer billing portal
 */
export function usePortal() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const openPortal = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/portal', {
                method: 'POST',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to open billing portal');
            }

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No portal URL returned');
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to open portal';
            setError(message);
            setLoading(false);
        }
    };

    return { openPortal, loading, error };
}
