-- Nom ou entreprise sur les avis clients
alter table public.note
  add column if not exists name text not null default '';

comment on column public.note.name is 'Nom ou entreprise du client (optionnel)';
