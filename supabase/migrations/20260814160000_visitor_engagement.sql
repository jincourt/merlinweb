-- Engagement par session : profondeur de scroll et durée
alter table public.visitor
  add column if not exists max_scroll_depth smallint not null default 0,
  add column if not exists last_duration_sec integer not null default 0,
  add column if not exists max_duration_sec integer not null default 0;

comment on column public.visitor.max_scroll_depth is 'Profondeur max de scroll (0-100) toutes sessions confondues';
comment on column public.visitor.last_duration_sec is 'Durée de la dernière session en secondes';
comment on column public.visitor.max_duration_sec is 'Durée max d''une session en secondes';
