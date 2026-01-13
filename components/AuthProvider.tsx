'use client'

import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  let supabase: any;
  try {
    supabase = createClient()
  } catch (e) {
    console.error("Failed to create Supabase client", e);
  }

  useEffect(() => {
    console.log("AuthProvider mounted. Supabase client exists:", !!supabase);
    if (!supabase) {
      setLoading(false);
      return;
    }

    const getUser = async () => {
      try {
        console.log("Calling getUser...");
        const { data: { user } } = await supabase.auth.getUser()
        console.log("getUser returned:", user);
        setUser(user)
      } catch (error) {
        console.error("Auth check failed", error)
      } finally {
        console.log("Setting loading to false");
        setLoading(false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
