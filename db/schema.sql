-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Replaces Linktree/About.me settings)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. BIO LINKS (Replaces Linktree functionality)
create table public.bio_links (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles on delete cascade not null,
  title text not null,
  url text not null,
  icon text, -- e.g., 'youtube', 'instagram'
  is_active boolean default true,
  order_index int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. DEALS (Replaces Grin/Aspire CRM functionality)
create table public.deals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  brand_name text not null,
  status text default 'lead', -- lead, negotiating, contract, content, review, paid
  deal_value numeric,
  currency text default 'USD',
  notes text,
  due_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (Crucial for Multi-Tenant Security)
alter table public.profiles enable row level security;
alter table public.bio_links enable row level security;
alter table public.deals enable row level security;

-- Policies: Users can only see/edit their own data
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Users can view own links" on public.bio_links for select using (
  exists (select 1 from public.profiles where profiles.id = bio_links.profile_id and profiles.id = auth.uid())
);
create policy "Users can manage own links" on public.bio_links for all using (
  exists (select 1 from public.profiles where profiles.id = bio_links.profile_id and profiles.id = auth.uid())
);

create policy "Users can view own deals" on public.deals for select using (auth.uid() = user_id);
create policy "Users can manage own deals" on public.deals for all using (auth.uid() = user_id);

-- Public Policy: Anyone can view a profile and links via username (for the Smart Bio page)
create policy "Public can view profiles by username" on public.profiles for select using (true);
create policy "Public can view active bio links" on public.bio_links for select using (is_active = true);
