-- ============================================
-- MONETIZATION MIGRATION
-- Run in Supabase SQL Editor
-- ============================================

-- 1. Affiliate link + featured fields on tools
ALTER TABLE tools ADD COLUMN IF NOT EXISTS affiliate_url TEXT;
ALTER TABLE tools ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE tools ADD COLUMN IF NOT EXISTS featured_priority INTEGER DEFAULT 0;
ALTER TABLE tools ADD COLUMN IF NOT EXISTS sponsor_label TEXT;

-- 2. Affiliate link + featured fields on platforms
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS affiliate_url TEXT;
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS featured_priority INTEGER DEFAULT 0;
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS sponsor_label TEXT;

-- 3. Indexes for featured queries
CREATE INDEX IF NOT EXISTS idx_tools_featured ON tools(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_platforms_featured ON platforms(is_featured) WHERE is_featured = true;

-- 4. Link click tracking
CREATE TABLE IF NOT EXISTS link_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_type TEXT NOT NULL,        -- 'tool' or 'platform'
  resource_id UUID NOT NULL,
  resource_name TEXT,                 -- denormalized for dashboard speed
  click_type TEXT NOT NULL DEFAULT 'outbound',  -- 'outbound' or 'affiliate'
  referrer_path TEXT,                 -- which page they clicked from
  ip_hash TEXT,                       -- hashed IP for dedup, not raw IP
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_link_clicks_resource ON link_clicks(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_link_clicks_type ON link_clicks(click_type);
CREATE INDEX IF NOT EXISTS idx_link_clicks_created ON link_clicks(created_at);

ALTER TABLE link_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert for click tracking" ON link_clicks FOR INSERT WITH CHECK (true);

-- 5. Ad placements
CREATE TABLE IF NOT EXISTS ad_placements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_name TEXT NOT NULL,            -- e.g. 'blog-sidebar', 'tools-top'
  title TEXT NOT NULL,
  image_url TEXT,
  destination_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ad_placements_slot ON ad_placements(slot_name);
CREATE INDEX IF NOT EXISTS idx_ad_placements_active ON ad_placements(is_active);

ALTER TABLE ad_placements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active ads" ON ad_placements FOR SELECT USING (is_active = true);

-- 6. Ad events (granular impression/click tracking)
CREATE TABLE IF NOT EXISTS ad_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ad_id UUID REFERENCES ad_placements(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,           -- 'impression' or 'click'
  referrer_path TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ad_events_ad ON ad_events(ad_id);
CREATE INDEX IF NOT EXISTS idx_ad_events_type ON ad_events(event_type);
CREATE INDEX IF NOT EXISTS idx_ad_events_created ON ad_events(created_at);

ALTER TABLE ad_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert for ad events" ON ad_events FOR INSERT WITH CHECK (true);

-- 7. Increment function for ad counters
CREATE OR REPLACE FUNCTION increment_ad_counter(p_ad_id UUID, p_field TEXT)
RETURNS void AS $$
BEGIN
  IF p_field = 'impressions' THEN
    UPDATE ad_placements SET impressions = impressions + 1 WHERE id = p_ad_id;
  ELSIF p_field = 'clicks' THEN
    UPDATE ad_placements SET clicks = clicks + 1 WHERE id = p_ad_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. User profiles (schema only -- not wired up to UI yet)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  company TEXT,
  role TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro')),
  saved_resources UUID[] DEFAULT '{}',
  assessment_results JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
