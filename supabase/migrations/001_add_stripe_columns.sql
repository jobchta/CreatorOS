-- ============================================
-- Add Stripe subscription columns to profiles
-- Run this after the initial schema.sql
-- ============================================

-- Add subscription columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_plan TEXT,
ADD COLUMN IF NOT EXISTS subscription_interval TEXT,
ADD COLUMN IF NOT EXISTS subscription_period_end TIMESTAMPTZ;

-- Index for Stripe customer lookups
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status ON profiles(subscription_status);

-- Comment explaining the columns
COMMENT ON COLUMN profiles.stripe_customer_id IS 'Stripe Customer ID for billing';
COMMENT ON COLUMN profiles.stripe_subscription_id IS 'Active Stripe Subscription ID';
COMMENT ON COLUMN profiles.subscription_status IS 'Subscription status: free, active, past_due, canceled';
COMMENT ON COLUMN profiles.subscription_plan IS 'Plan: creator, pro, agency';
COMMENT ON COLUMN profiles.subscription_interval IS 'Billing interval: monthly, annual';
COMMENT ON COLUMN profiles.subscription_period_end IS 'When the current billing period ends';
