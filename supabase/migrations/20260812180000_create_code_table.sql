-- Table des codes d'invitation (parrainage 50.- CHF, hors réduction prix)
create table if not exists public.code (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  phone_digits text not null,
  code text not null unique,
  created_at timestamptz not null default now()
);

create unique index if not exists code_phone_digits_unique on public.code (phone_digits);
create index if not exists code_code_idx on public.code (code);

alter table public.code enable row level security;

-- Accès réservé au service role (API serveur uniquement)
create policy "Service role full access"
  on public.code
  for all
  to service_role
  using (true)
  with check (true);
