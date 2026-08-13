-- Suivi des visites du site
create table if not exists public.visit (
  id uuid primary key default gen_random_uuid(),
  path text not null default '/',
  created_at timestamptz not null default now()
);

create index if not exists visit_created_at_idx on public.visit (created_at desc);

alter table public.visit enable row level security;

create policy "Service role full access"
  on public.visit
  for all
  to service_role
  using (true)
  with check (true);
