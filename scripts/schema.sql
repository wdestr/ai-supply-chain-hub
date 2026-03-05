-- AI in Supply Chain Resource Hub — Database Schema
-- Run this in Supabase SQL Editor to create all tables

-- Use cases
CREATE TABLE IF NOT EXISTS use_cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  function_area TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  companies TEXT[] DEFAULT '{}',
  tools_used TEXT[] DEFAULT '{}',
  results TEXT,
  sources TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- General AI tools
CREATE TABLE IF NOT EXISTS tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  url TEXT,
  description TEXT,
  supply_chain_relevance TEXT,
  pricing_model TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Supply chain AI platforms
CREATE TABLE IF NOT EXISTS platforms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT,
  founded TEXT,
  funding TEXT,
  description TEXT,
  function_area TEXT,
  key_customers TEXT[] DEFAULT '{}',
  ai_approach TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Learning resources
CREATE TABLE IF NOT EXISTS learning_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  url TEXT,
  description TEXT,
  cost TEXT,
  level TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Inspiration projects
CREATE TABLE IF NOT EXISTS inspiration_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_name TEXT NOT NULL,
  creator TEXT,
  description TEXT,
  what_they_built TEXT,
  tools_used TEXT[] DEFAULT '{}',
  link TEXT,
  secondary_links TEXT[] DEFAULT '{}',
  category TEXT,
  why_inspiring TEXT,
  sc_application TEXT,
  project_type TEXT DEFAULT 'supply_chain',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Page view analytics
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  active BOOLEAN DEFAULT true
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  read BOOLEAN DEFAULT false
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_use_cases_function ON use_cases(function_area);
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category);
CREATE INDEX IF NOT EXISTS idx_platforms_function ON platforms(function_area);
CREATE INDEX IF NOT EXISTS idx_learning_type ON learning_resources(type);
CREATE INDEX IF NOT EXISTS idx_learning_level ON learning_resources(level);
CREATE INDEX IF NOT EXISTS idx_inspiration_category ON inspiration_projects(category);
CREATE INDEX IF NOT EXISTS idx_inspiration_type ON inspiration_projects(project_type);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);

-- Full-text search indexes
ALTER TABLE use_cases ADD COLUMN IF NOT EXISTS fts tsvector
  GENERATED ALWAYS AS (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(function_area, ''))) STORED;
CREATE INDEX IF NOT EXISTS idx_use_cases_fts ON use_cases USING gin(fts);

ALTER TABLE tools ADD COLUMN IF NOT EXISTS fts tsvector
  GENERATED ALWAYS AS (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(category, ''))) STORED;
CREATE INDEX IF NOT EXISTS idx_tools_fts ON tools USING gin(fts);

ALTER TABLE platforms ADD COLUMN IF NOT EXISTS fts tsvector
  GENERATED ALWAYS AS (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(function_area, ''))) STORED;
CREATE INDEX IF NOT EXISTS idx_platforms_fts ON platforms USING gin(fts);

ALTER TABLE learning_resources ADD COLUMN IF NOT EXISTS fts tsvector
  GENERATED ALWAYS AS (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(type, ''))) STORED;
CREATE INDEX IF NOT EXISTS idx_learning_fts ON learning_resources USING gin(fts);

ALTER TABLE inspiration_projects ADD COLUMN IF NOT EXISTS fts tsvector
  GENERATED ALWAYS AS (to_tsvector('english', coalesce(project_name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(category, ''))) STORED;
CREATE INDEX IF NOT EXISTS idx_inspiration_fts ON inspiration_projects USING gin(fts);

-- Row Level Security
ALTER TABLE use_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspiration_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for resource tables
CREATE POLICY "Public read access" ON use_cases FOR SELECT USING (true);
CREATE POLICY "Public read access" ON tools FOR SELECT USING (true);
CREATE POLICY "Public read access" ON platforms FOR SELECT USING (true);
CREATE POLICY "Public read access" ON learning_resources FOR SELECT USING (true);
CREATE POLICY "Public read access" ON inspiration_projects FOR SELECT USING (true);

-- Public insert for analytics, newsletter, contact
CREATE POLICY "Public insert" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Admin-only write access for resource tables (via service role key, bypasses RLS)
-- No explicit write policies needed; the service role key skips RLS.
