import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Creates a Supabase client for Server Components and Server Actions.
 * Uses cookies for authentication state.
 */
export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch {
                        // Handle cookie setting in read-only contexts (e.g., middleware)
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: '', ...options });
                    } catch {
                        // Handle cookie removal in read-only contexts
                    }
                },
            },
        }
    );
}

/**
 * Type definitions for database tables
 */
export interface SimulationResult {
    score: number;
    reasoning: string;
    category: string;
}

export interface Simulation {
    id: string;
    user_id: string | null;
    input_content: string;
    result_json: SimulationResult;
    score: number;
    category: string;
    model_used: string;
    created_at: string;
}

export interface WaitlistEntry {
    id: string;
    email: string;
    source: string;
    score_at_signup: number | null;
    created_at: string;
}
