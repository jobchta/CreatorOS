import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/db/database.types'

export const createClient = () => {
  // Fallback for build time or missing keys
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseKey
  )
}
