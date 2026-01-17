-- ============================================
-- LogicLoom Event Sourcing Database Schema
-- ============================================
-- This schema implements an Event Sourcing pattern with:
-- 1. profiles: User metadata linked to Supabase auth
-- 2. event_stream: Immutable log of all user actions
-- 3. simulations: AI analysis results for viral content
-- 4. waitlist: Email collection for premium features
-- ============================================

-- ============================================
-- PROFILES TABLE
-- Purpose: Store user profile data linked to auth.users
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- EVENT_STREAM TABLE
-- Purpose: Immutable log of all user actions (Event Sourcing)
-- This enables full audit trails and state reconstruction
-- ============================================
CREATE TABLE IF NOT EXISTS event_stream (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for efficient user event queries
CREATE INDEX IF NOT EXISTS idx_event_stream_user_id ON event_stream(user_id);
CREATE INDEX IF NOT EXISTS idx_event_stream_event_type ON event_stream(event_type);
CREATE INDEX IF NOT EXISTS idx_event_stream_created_at ON event_stream(created_at DESC);

-- Enable RLS on event_stream
ALTER TABLE event_stream ENABLE ROW LEVEL SECURITY;

-- Users can view their own events
CREATE POLICY "Users can view own events" ON event_stream
  FOR SELECT USING (auth.uid() = user_id);

-- Anyone can insert events (for anonymous users too)
CREATE POLICY "Anyone can insert events" ON event_stream
  FOR INSERT WITH CHECK (true);

-- ============================================
-- SIMULATIONS TABLE
-- Purpose: Store AI analysis results for viral content
-- ============================================
CREATE TABLE IF NOT EXISTS simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  input_content TEXT NOT NULL,
  result_json JSONB NOT NULL,
  score INTEGER,
  category TEXT,
  model_used TEXT DEFAULT 'llama3-70b-8192',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for analytics queries
CREATE INDEX IF NOT EXISTS idx_simulations_user_id ON simulations(user_id);
CREATE INDEX IF NOT EXISTS idx_simulations_score ON simulations(score DESC);
CREATE INDEX IF NOT EXISTS idx_simulations_created_at ON simulations(created_at DESC);

-- Enable RLS on simulations
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;

-- Users can view their own simulations
CREATE POLICY "Users can view own simulations" ON simulations
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- Anyone can insert simulations
CREATE POLICY "Anyone can insert simulations" ON simulations
  FOR INSERT WITH CHECK (true);

-- ============================================
-- WAITLIST TABLE
-- Purpose: Collect emails for premium feature interest
-- ============================================
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'simulator',
  score_at_signup INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Enable RLS on waitlist
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Anyone can insert to waitlist
CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

-- ============================================
-- TRIGGER: Auto-update updated_at on profiles
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
