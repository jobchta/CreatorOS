import { createClient } from '@/utils/supabase/client'
import {
  AnalyticsSnapshot,
  ContentPost,
  BrandDeal,
  User,
  Database
} from '@/lib/database.types'

const supabase = createClient()

// READ Operations

export const fetchAnalytics = async (userId: string): Promise<AnalyticsSnapshot[]> => {
  const { data, error } = await supabase
    .from('analytics_snapshots')
    .select('*')
    .eq('user_id', userId)
    .order('snapshot_date', { ascending: false })

  if (error) throw error
  return data || []
}

export const fetchPosts = async (userId: string): Promise<ContentPost[]> => {
  const { data, error } = await supabase
    .from('content_calendar')
    .select('*')
    .eq('user_id', userId)
    .order('scheduled_date', { ascending: true })

  if (error) throw error
  return data || []
}

export const fetchDeals = async (userId: string): Promise<BrandDeal[]> => {
  const { data, error } = await supabase
    .from('brand_deals')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data || []
}

export const fetchUser = async (userId: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) return null
  return data
}

// WRITE Operations

// Posts
export const createPost = async (userId: string, post: Omit<ContentPost, 'id' | 'user_id'>): Promise<ContentPost> => {
  const { data, error } = await supabase
    .from('content_calendar')
    .insert({ ...post, user_id: userId })
    .select()
    .single()

  if (error) throw error
  return data
}

export const updatePost = async (id: string, updates: Partial<ContentPost>): Promise<ContentPost> => {
  const { data, error } = await supabase
    .from('content_calendar')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deletePost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('content_calendar')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Deals
export const createDeal = async (userId: string, deal: Omit<BrandDeal, 'id' | 'user_id' | 'created_at'>): Promise<BrandDeal> => {
  const { data, error } = await supabase
    .from('brand_deals')
    .insert({ ...deal, user_id: userId })
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateDeal = async (id: string, updates: Partial<BrandDeal>): Promise<BrandDeal> => {
  const { data, error } = await supabase
    .from('brand_deals')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteDeal = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('brand_deals')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// User
export const updateUserProfile = async (userId: string, updates: Partial<User>): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}
