-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    tier TEXT CHECK (tier IN ('free', 'starter', 'pro', 'enterprise')) DEFAULT 'free',
    instagram_username TEXT,
    tiktok_username TEXT,
    youtube_channel TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Snapshots
CREATE TABLE analytics_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    followers BIGINT,
    engagement_rate NUMERIC(5, 2),
    snapshot_date DATE DEFAULT CURRENT_DATE,
    metrics JSONB -- stores likes, comments, shares, etc.
);

-- Content Calendar
CREATE TABLE content_calendar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    post_type TEXT,
    caption TEXT,
    hashtags TEXT[],
    scheduled_date TIMESTAMP WITH TIME ZONE,
    status TEXT CHECK (status IN ('idea', 'planned', 'published')) DEFAULT 'idea',
    external_link TEXT -- Link to actual content, NO video stored
);

-- Brand Deals
CREATE TABLE brand_deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    brand_name TEXT NOT NULL,
    deal_value NUMERIC(10, 2),
    status TEXT CHECK (status IN ('prospect', 'active', 'completed', 'cancelled')) DEFAULT 'prospect',
    deliverables JSONB,
    invoice_url TEXT,
    payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'overdue')) DEFAULT 'pending'
);

-- Creator Profiles (for Marketplace)
CREATE TABLE creator_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    niche TEXT[],
    portfolio_links JSONB, -- Array of links to Instagram posts, TikToks
    open_to_collabs BOOLEAN DEFAULT TRUE,
    rate_card JSONB
);

-- Collab Matches
CREATE TABLE collab_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_a_id UUID REFERENCES users(id) ON DELETE CASCADE,
    creator_b_id UUID REFERENCES users(id) ON DELETE CASCADE,
    compatibility_score NUMERIC(5, 2),
    status TEXT CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'pending'
);

-- Digital Products
CREATE TABLE digital_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_type TEXT CHECK (product_type IN ('ebook', 'preset', 'template', 'other')),
    title TEXT NOT NULL,
    price NUMERIC(10, 2),
    file_url TEXT, -- Supabase Storage URL
    sales_count INTEGER DEFAULT 0
);

-- Link Pages (Link-in-Bio)
CREATE TABLE link_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    custom_domain TEXT UNIQUE,
    links JSONB, -- Array of {title, url}
    theme JSONB
);

-- Email Subscribers
CREATE TABLE email_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subscriber_email TEXT NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    tags TEXT[]
);
