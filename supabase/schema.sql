create extension if not exists "pgcrypto";

create table if not exists comerciales (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  color text not null default '#1d4ed8',
  created_at timestamptz not null default now()
);

create table if not exists servicios (
  id uuid primary key default gen_random_uuid(),
  curso text not null,
  instructor text not null,
  empresa text not null,
  comercial_id uuid not null references comerciales(id) on delete cascade,
  estado text not null check (estado in ('Programado', 'Ejecutado', 'Reprogramado')),
  facturado boolean not null default false,
  pagado boolean not null default false,
  color text not null default '#f97316',
  created_at timestamptz not null default now()
);

create table if not exists servicio_fechas (
  id uuid primary key default gen_random_uuid(),
  servicio_id uuid not null references servicios(id) on delete cascade,
  fecha date not null,
  horas int not null check (horas > 0)
);

insert into comerciales (nombre, color)
values
  ('CRISTHIAN', '#2563eb'),
  ('FIORELLA', '#ea580c'),
  ('MAYERLY', '#16a34a'),
  ('VALERIA', '#7c3aed')
on conflict (nombre) do nothing;
