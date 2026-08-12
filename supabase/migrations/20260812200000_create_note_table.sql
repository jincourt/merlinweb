-- Avis clients (étoiles + commentaire)
create table if not exists public.note (
  id uuid primary key default gen_random_uuid(),
  stars smallint not null check (stars >= 1 and stars <= 5),
  comment text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists note_created_at_idx on public.note (created_at desc);

alter table public.note enable row level security;

create policy "Service role full access"
  on public.note
  for all
  to service_role
  using (true)
  with check (true);
