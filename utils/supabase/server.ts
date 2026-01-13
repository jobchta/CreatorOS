// @ts-ignore
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()

    // Graceful fallback: If keys are missing, return a dummy client or null to prevent crash
    // However, createServerClient expects strings.
    // If keys are missing, the App is in "Demo Mode" effectively.
    // We should allow this function to fail gracefully or return a mock if possible,
    // but typically this is called in contexts expecting a valid client.

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
         console.warn("Supabase keys missing. Returning null client.");
         // We can't return null because of strict typing in many places,
         // but throwing here or returning a broken client is better than crashing blindly.
         // Let's return a minimal mock or let it crash later but with a better error?
         // Actually, if we just return undefined/null, the caller needs to handle it.
         // Given the codebase, let's just avoid the crash by passing empty strings
         // The calls will fail, but the app won't crash on startup.
         return createServerClient(
            'https://placeholder.supabase.co',
            'placeholder',
            {
                cookies: {
                    getAll() { return cookieStore.getAll() },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            )
                        } catch {}
                    },
                },
            }
        )
    }

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}
