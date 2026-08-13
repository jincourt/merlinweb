-- Demandes de devis (formulaire client)
create table if not exists public.quote (
  id uuid primary key default gen_random_uuid(),
  email text not null default '',
  phone text not null default '',
  selected_ids jsonb not null default '[]'::jsonb,
  message text not null default '',
  invite_code text not null default '',
  total integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists quote_created_at_idx on public.quote (created_at desc);

alter table public.quote enable row level security;

create policy "Service role full access"
  on public.quote
  for all
  to service_role
  using (true)
  with check (true);
