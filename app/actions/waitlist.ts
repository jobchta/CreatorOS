'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

/**
 * Zod schema for waitlist input validation
 */
const WaitlistInputSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    score: z.number().optional(),
});

/**
 * State type for the waitlist form
 */
export interface WaitlistState {
    success: boolean;
    error: string | null;
    message: string | null;
}

/**
 * Server Action: Join the waitlist for premium features
 * 
 * @param prevState - Previous form state
 * @param formData - Form data containing 'email' and optional 'score' fields
 * @returns WaitlistState with success/error status
 */
export async function joinWaitlist(
    prevState: WaitlistState | null,
    formData: FormData
): Promise<WaitlistState> {
    try {
        // 1. Extract and validate input
        const rawEmail = formData.get('email');
        const rawScore = formData.get('score');

        const validationResult = WaitlistInputSchema.safeParse({
            email: rawEmail,
            score: rawScore ? Number(rawScore) : undefined,
        });

        if (!validationResult.success) {
            const firstError = validationResult.error.issues[0];
            return {
                success: false,
                error: firstError?.message ?? 'Invalid email',
                message: null,
            };
        }

        const { email, score } = validationResult.data;

        // 2. Insert into Supabase
        const supabase = await createClient();

        const { error: insertError } = await supabase
            .from('waitlist')
            .insert({
                email: email.toLowerCase().trim(),
                source: 'simulator',
                score_at_signup: score ?? null,
            });

        if (insertError) {
            // Handle duplicate email
            if (insertError.code === '23505') {
                return {
                    success: false,
                    error: 'This email is already on the waitlist!',
                    message: null,
                };
            }

            return {
                success: false,
                error: 'Failed to join waitlist. Please try again.',
                message: null,
            };
        }

        // 3. Log to event stream
        try {
            const { data: { user } } = await supabase.auth.getUser();

            await supabase.from('event_stream').insert({
                user_id: user?.id ?? null,
                event_type: 'waitlist_joined',
                payload: {
                    email_domain: email.split('@')[1],
                    score_at_signup: score,
                },
            });
        } catch {
            // Don't fail if event logging fails
        }

        // 4. Return success
        return {
            success: true,
            error: null,
            message: "You're on the list! We'll be in touch soon. 🎉",
        };

    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        return {
            success: false,
            error: message,
            message: null,
        };
    }
}
