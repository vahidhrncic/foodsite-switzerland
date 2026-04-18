-- ============================================================
-- FoodSite Switzerland – Initial Schema
-- ============================================================

-- news_items: cached news from the fetch-food-news edge function
create table if not exists public.news_items (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  url         text,
  published_at timestamptz,
  category    text check (category in ('disease','regulation','disaster','market')),
  priority    text check (priority in ('high','medium','low')) default 'low',
  source      text,
  created_at  timestamptz default now()
);

-- metrics: aggregate stats (Swiss + global food indicators)
create table if not exists public.metrics (
  id         uuid primary key default gen_random_uuid(),
  key        text not null unique,
  value      numeric,
  text_value text,
  unit       text,
  year       int,
  source     text,
  updated_at timestamptz default now()
);

-- alerts: supply chain alerts
create table if not exists public.alerts (
  id          uuid primary key default gen_random_uuid(),
  region      text,
  severity    text check (severity in ('high','medium','low')) default 'low',
  title       text not null,
  description text,
  resolved    boolean default false,
  created_at  timestamptz default now()
);

-- regions_cache: dynamic status overrides for map regions
create table if not exists public.regions_cache (
  id          uuid primary key default gen_random_uuid(),
  region_name text not null unique,
  status      text check (status in ('good','warning','critical')) default 'good',
  notes       text,
  updated_at  timestamptz default now()
);

-- price_data: commodity price time series
create table if not exists public.price_data (
  id           uuid primary key default gen_random_uuid(),
  commodity    text not null,
  price        numeric,
  unit         text,
  currency     text default 'USD',
  recorded_at  date not null,
  source       text,
  created_at   timestamptz default now(),
  unique (commodity, recorded_at)
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.news_items    enable row level security;
alter table public.metrics       enable row level security;
alter table public.alerts        enable row level security;
alter table public.regions_cache enable row level security;
alter table public.price_data    enable row level security;

-- Anon users can read everything (public dashboard)
create policy "anon_read_news"    on public.news_items    for select using (true);
create policy "anon_read_metrics" on public.metrics       for select using (true);
create policy "anon_read_alerts"  on public.alerts        for select using (true);
create policy "anon_read_regions" on public.regions_cache for select using (true);
create policy "anon_read_prices"  on public.price_data    for select using (true);

-- ============================================================
-- Seed default Swiss metrics (fallback values)
-- ============================================================

insert into public.metrics (key, value, unit, year, source) values
  ('swiss_import_value_chf_mrd',  12.8, 'Mrd. CHF', 2022, 'BLW'),
  ('swiss_export_value_chf_mrd',  9.8,  'Mrd. CHF', 2022, 'BLW'),
  ('swiss_self_sufficiency_pct',  54,   '%',         2022, 'BLW'),
  ('global_food_price_index',     118,  'Index',     2024, 'FAO'),
  ('ch_cereal_production_kt',     480,  'kt',        2022, 'BLW'),
  ('ch_dairy_production_kt',      3900, 'kt',        2022, 'BLW'),
  ('ch_meat_production_kt',       485,  'kt',        2022, 'BLW'),
  ('ch_vegetable_production_kt',  445,  'kt',        2022, 'BLW')
on conflict (key) do nothing;
