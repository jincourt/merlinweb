-- Devis et factures admin
create table if not exists public.invoice (
  id uuid primary key default gen_random_uuid(),
  number text not null unique,
  type text not null check (type in ('devis', 'facture')),
  status text not null default 'draft' check (status in ('draft', 'sent', 'paid', 'cancelled')),
  client_name text not null,
  client_email text,
  client_phone text,
  client_address text,
  line_items jsonb not null default '[]'::jsonb,
  notes text not null default '',
  subtotal integer not null default 0,
  total integer not null default 0,
  valid_until date,
  due_date date,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists invoice_created_idx on public.invoice (created_at desc);
create index if not exists invoice_type_idx on public.invoice (type);
create index if not exists invoice_status_idx on public.invoice (status);

alter table public.invoice enable row level security;

create policy "Service role full access"
  on public.invoice
  for all
  to service_role
  using (true)
  with check (true);
