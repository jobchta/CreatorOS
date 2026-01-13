import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/database.types'

export const createClient = () => {
  // Graceful fallback for client-side
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn("Supabase keys missing. Using mock client.");

      // Return a mock object that mimics the Supabase client interface for Auth
      return {
        auth: {
          getUser: async () => ({ data: { user: null }, error: new Error("Missing keys") }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          getSession: async () => ({ data: { session: null }, error: null }),
        },
        from: () => ({
          select: () => ({ order: () => ({ limit: async () => ({ data: [], error: null }) }) }),
          insert: async () => ({ error: null }),
          update: async () => ({ error: null }),
          delete: async () => ({ error: null }),
        })
      } as any;
  }

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
