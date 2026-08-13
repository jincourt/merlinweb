-- Visiteurs uniques (une ligne par navigateur, identifié côté client)
create table if not exists public.visitor (
  id uuid primary key default gen_random_uuid(),
  visitor_key text not null unique,
  first_path text not null default '/',
  last_path text not null default '/',
  referrer text,
  user_agent text,
  language text,
  screen text,
  timezone text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  invite_code text,
  session_count integer not null default 1,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create index if not exists visitor_last_seen_idx on public.visitor (last_seen_at desc);
create index if not exists visitor_first_seen_idx on public.visitor (first_seen_at desc);

alter table public.visitor enable row level security;

create policy "Service role full access"
  on public.visitor
  for all
  to service_role
  using (true)
  with check (true);
