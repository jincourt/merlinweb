-- Statut de la demande : brouillon (lead capturé) ou soumise (devis final)
alter table public.quote
  add column if not exists status text not null default 'submitted'
    check (status in ('draft', 'submitted'));

comment on column public.quote.status is 'draft = coordonnées capturées, submitted = demande envoyée';

create index if not exists quote_status_created_at_idx
  on public.quote (status, created_at desc);
