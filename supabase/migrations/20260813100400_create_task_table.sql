-- Tâches admin (tableau Kanban)
create table if not exists public.task (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  due_date date,
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done')),
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists task_status_idx on public.task (status, position);
create index if not exists task_due_date_idx on public.task (due_date);

alter table public.task enable row level security;

create policy "Service role full access"
  on public.task
  for all
  to service_role
  using (true)
  with check (true);
