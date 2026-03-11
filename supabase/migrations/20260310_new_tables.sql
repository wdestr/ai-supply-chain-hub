-- Tool/platform submissions from the /submit form
create table if not exists tool_submissions (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  url             text not null,
  category        text,
  description     text,
  pricing_model   text,
  supply_chain_relevance text,
  contact_email   text not null,
  status          text not null default 'pending',  -- pending | approved | rejected
  created_at      timestamptz not null default now()
);

-- Star ratings for tools and platforms
create table if not exists tool_ratings (
  id              uuid primary key default gen_random_uuid(),
  resource_type   text not null check (resource_type in ('tool', 'platform')),
  resource_id     text not null,   -- slug
  rating          int  not null check (rating between 1 and 5),
  created_at      timestamptz not null default now()
);

-- Index for fast average lookups
create index if not exists tool_ratings_resource_idx
  on tool_ratings (resource_type, resource_id);
