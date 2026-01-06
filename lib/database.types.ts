// Complete TypeScript types for LogicLoom database

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Enums
export type UserTier = 'free' | 'starter' | 'pro' | 'enterprise';
export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter';
export type ContentStatus = 'idea' | 'planned' | 'scripted' | 'filmed' | 'published';
export type DealStatus = 'prospect' | 'negotiation' | 'active' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'overdue';
export type CollabStatus = 'pending' | 'accepted' | 'declined';
export type ProductType = 'ebook' | 'preset' | 'template' | 'course' | 'other';

// User
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  tier: UserTier;
  instagram_username?: string;
  tiktok_username?: string;
  youtube_channel?: string;
  twitter_handle?: string;
  bio?: string;
  niche: string[];
  created_at: string;
}

// Analytics Snapshot
export interface AnalyticsSnapshot {
  id: string;
  user_id: string;
  platform: Platform;
  followers: number;
  following: number;
  engagement_rate: number;
  avg_likes: number;
  avg_comments: number;
  avg_views: number;
  snapshot_date: string;
  metrics: {
    posts_count: number;
    reels_count?: number;
    stories_avg_views?: number;
    reach?: number;
    impressions?: number;
  };
}

// Content Calendar Post
export interface ContentPost {
  id: string;
  user_id: string;
  platform: Platform;
  post_type: 'post' | 'reel' | 'story' | 'video' | 'short' | 'carousel';
  title: string;
  caption?: string;
  hashtags: string[];
  scheduled_date: string;
  scheduled_time?: string;
  status: ContentStatus;
  external_link?: string;
  thumbnail?: string;
  notes?: string;
}

// Brand Deal
export interface BrandDeal {
  id: string;
  user_id: string;
  brand_name: string;
  brand_logo?: string;
  contact_name?: string;
  contact_email?: string;
  deal_value: number;
  currency: string;
  status: DealStatus;
  deliverables: Deliverable[];
  start_date?: string;
  end_date?: string;
  payment_status: PaymentStatus;
  invoice_url?: string;
  notes?: string;
  created_at: string;
}

export interface Deliverable {
  id: string;
  type: string;
  platform: Platform;
  description: string;
  due_date?: string;
  completed: boolean;
}

// Creator Profile (for Marketplace)
export interface CreatorProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar: string;
  bio: string;
  niche: string[];
  followers: number;
  engagement_rate: number;
  portfolio_links: PortfolioItem[];
  open_to_collabs: boolean;
  rate_card: RateCard;
  location?: string;
  languages: string[];
}

export interface PortfolioItem {
  platform: Platform;
  url: string;
  thumbnail?: string;
  title?: string;
}

export interface RateCard {
  instagram_post?: number;
  instagram_reel?: number;
  instagram_story?: number;
  tiktok_video?: number;
  youtube_video?: number;
  youtube_short?: number;
}

// Collab Match
export interface CollabMatch {
  id: string;
  creator_a_id: string;
  creator_b_id: string;
  creator_a_profile?: CreatorProfile;
  creator_b_profile?: CreatorProfile;
  compatibility_score: number;
  status: CollabStatus;
  message?: string;
  created_at: string;
}

// Digital Product
export interface DigitalProduct {
  id: string;
  user_id: string;
  product_type: ProductType;
  title: string;
  description: string;
  price: number;
  currency: string;
  cover_image?: string;
  file_url?: string;
  sales_count: number;
  is_active: boolean;
  created_at: string;
}

// Link Page (Link-in-Bio)
export interface LinkPage {
  id: string;
  user_id: string;
  slug: string;
  custom_domain?: string;
  title: string;
  bio?: string;
  avatar?: string;
  links: LinkItem[];
  social_links: SocialLink[];
  theme: LinkPageTheme;
  clicks_total: number;
  created_at: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  clicks: number;
  is_active: boolean;
}

export interface SocialLink {
  platform: Platform | 'website' | 'email';
  url: string;
}

export interface LinkPageTheme {
  background_color: string;
  background_gradient?: string;
  text_color: string;
  button_style: 'filled' | 'outline' | 'soft';
  button_color: string;
  button_radius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  font: string;
}

// Email Subscriber
export interface EmailSubscriber {
  id: string;
  user_id: string;
  subscriber_email: string;
  subscriber_name?: string;
  subscribed_at: string;
  tags: string[];
  is_active: boolean;
}

// Idea Backlog
export interface ContentIdea {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  platform?: Platform;
  content_type?: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

// Rate Calculation History
export interface RateCalculation {
  id: string;
  user_id: string;
  platform: Platform;
  followers: number;
  niche: string;
  engagement_rate?: number;
  estimated_min: number;
  estimated_max: number;
  calculated_at: string;
}

// Hashtag Collection
export interface HashtagCollection {
  id: string;
  user_id: string;
  name: string;
  hashtags: string[];
  created_at: string;
}

// Caption Template
export interface CaptionTemplate {
  id: string;
  user_id: string;
  name: string;
  template: string;
  category: string;
  created_at: string;
}

// App State
export interface AppState {
  user: User | null;
  analytics: AnalyticsSnapshot[];
  posts: ContentPost[];
  ideas: ContentIdea[];
  deals: BrandDeal[];
  creators: CreatorProfile[];
  collabs: CollabMatch[];
  products: DigitalProduct[];
  linkPage: LinkPage | null;
  subscribers: EmailSubscriber[];
  rateHistory: RateCalculation[];
  hashtagCollections: HashtagCollection[];
  captionTemplates: CaptionTemplate[];
}

// Database interface for Supabase compatibility
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<User>;
      };
      analytics_snapshots: {
        Row: AnalyticsSnapshot;
        Insert: Omit<AnalyticsSnapshot, 'id'> & { id?: string };
        Update: Partial<AnalyticsSnapshot>;
      };
      content_calendar: {
        Row: ContentPost;
        Insert: Omit<ContentPost, 'id'> & { id?: string };
        Update: Partial<ContentPost>;
      };
      brand_deals: {
        Row: BrandDeal;
        Insert: Omit<BrandDeal, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<BrandDeal>;
      };
      creator_profiles: {
        Row: CreatorProfile;
        Insert: Omit<CreatorProfile, 'id'> & { id?: string };
        Update: Partial<CreatorProfile>;
      };
      collab_matches: {
        Row: CollabMatch;
        Insert: Omit<CollabMatch, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<CollabMatch>;
      };
      digital_products: {
        Row: DigitalProduct;
        Insert: Omit<DigitalProduct, 'id' | 'created_at' | 'sales_count'> & { id?: string; created_at?: string; sales_count?: number };
        Update: Partial<DigitalProduct>;
      };
      link_pages: {
        Row: LinkPage;
        Insert: Omit<LinkPage, 'id' | 'created_at' | 'clicks_total'> & { id?: string; created_at?: string; clicks_total?: number };
        Update: Partial<LinkPage>;
      };
      email_subscribers: {
        Row: EmailSubscriber;
        Insert: Omit<EmailSubscriber, 'id' | 'subscribed_at'> & { id?: string; subscribed_at?: string };
        Update: Partial<EmailSubscriber>;
      };
    };
  };
}
