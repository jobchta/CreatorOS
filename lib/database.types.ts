export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          tier: 'free' | 'starter' | 'pro' | 'enterprise'
          instagram_username: string | null
          tiktok_username: string | null
          youtube_channel: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          tier?: 'free' | 'starter' | 'pro' | 'enterprise'
          instagram_username?: string | null
          tiktok_username?: string | null
          youtube_channel?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          tier?: 'free' | 'starter' | 'pro' | 'enterprise'
          instagram_username?: string | null
          tiktok_username?: string | null
          youtube_channel?: string | null
          created_at?: string
        }
      }
      content_calendar: {
        Row: {
          id: string
          user_id: string
          platform: string
          post_type: string | null
          caption: string | null
          hashtags: string[] | null
          scheduled_date: string | null
          status: 'idea' | 'planned' | 'published'
          external_link: string | null
        }
        Insert: {
          id?: string
          user_id: string
          platform: string
          post_type?: string | null
          caption?: string | null
          hashtags?: string[] | null
          scheduled_date?: string | null
          status?: 'idea' | 'planned' | 'published'
          external_link?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          platform?: string
          post_type?: string | null
          caption?: string | null
          hashtags?: string[] | null
          scheduled_date?: string | null
          status?: 'idea' | 'planned' | 'published'
          external_link?: string | null
        }
      }
      // Add other tables similarly as needed
    }
  }
}
