-- ==========================================
-- AMPARA — Schema inicial
-- Ejecutar en Supabase SQL Editor
-- ==========================================

-- PROFILES
create table if not exists public.profiles (
  id                   uuid references auth.users(id) on delete cascade primary key,
  full_name            text,
  email                text,
  phone                text,
  city                 text,
  role                 text check (role in ('solicitante', 'apoyador', 'ambos')),
  avatar_url           text,
  trust_score          integer not null default 75,
  onboarding_completed boolean not null default false,
  created_at           timestamptz not null default now()
);

-- REQUESTS
create table if not exists public.requests (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid references public.profiles(id) on delete cascade not null,
  amount               integer not null,
  repayment_days       integer not null,
  reason               text,
  city                 text,
  profession           text,
  income_frequency     text check (income_frequency in ('diario','semanal','mensual','irregular')),
  urgency_level        text check (urgency_level in ('baja','media','alta')),
  repayment_type       text check (repayment_type in ('dinero','dinero_servicio','dinero_producto','personalizado')),
  repayment_description text,
  guarantor_name       text,
  guarantor_phone      text,
  status               text not null default 'open' check (status in ('open','in_progress','closed','cancelled')),
  created_at           timestamptz not null default now()
);

-- OFFERS
create table if not exists public.offers (
  id               uuid primary key default gen_random_uuid(),
  request_id       uuid references public.requests(id) on delete cascade not null,
  supporter_id     uuid references public.profiles(id) on delete cascade not null,
  proposed_amount  integer,
  proposed_terms   text,
  status           text not null default 'pending' check (status in ('pending','accepted','rejected')),
  created_at       timestamptz not null default now()
);

-- AGREEMENTS
create table if not exists public.agreements (
  id               uuid primary key default gen_random_uuid(),
  request_id       uuid references public.requests(id) on delete set null,
  borrower_id      uuid references public.profiles(id) on delete cascade not null,
  supporter_id     uuid references public.profiles(id) on delete cascade not null,
  amount           integer,
  repayment_terms  text,
  agreement_status text not null default 'active' check (agreement_status in ('active','completed','defaulted')),
  created_at       timestamptz not null default now()
);

-- ==========================================
-- ROW LEVEL SECURITY
-- ==========================================

alter table public.profiles  enable row level security;
alter table public.requests  enable row level security;
alter table public.offers    enable row level security;
alter table public.agreements enable row level security;

-- PROFILES: cada usuario ve y edita solo su perfil
create policy "perfil_select" on public.profiles for select using (auth.uid() = id);
create policy "perfil_insert" on public.profiles for insert with check (auth.uid() = id);
create policy "perfil_update" on public.profiles for update using (auth.uid() = id);

-- REQUESTS: cada usuario ve las abiertas; edita solo las suyas
create policy "requests_select_open" on public.requests
  for select using (status = 'open' or auth.uid() = user_id);
create policy "requests_insert" on public.requests
  for insert with check (auth.uid() = user_id);
create policy "requests_update" on public.requests
  for update using (auth.uid() = user_id);
create policy "requests_delete" on public.requests
  for delete using (auth.uid() = user_id);

-- OFFERS: apoyador gestiona sus ofertas; solicitante ve las de sus requests
create policy "offers_select" on public.offers
  for select using (
    auth.uid() = supporter_id
    or exists (
      select 1 from public.requests r
      where r.id = request_id and r.user_id = auth.uid()
    )
  );
create policy "offers_insert" on public.offers
  for insert with check (auth.uid() = supporter_id);
create policy "offers_update" on public.offers
  for update using (
    auth.uid() = supporter_id
    or exists (
      select 1 from public.requests r
      where r.id = request_id and r.user_id = auth.uid()
    )
  );

-- AGREEMENTS: participantes pueden ver sus acuerdos
create policy "agreements_select" on public.agreements
  for select using (
    auth.uid() = borrower_id or auth.uid() = supporter_id
  );
create policy "agreements_insert" on public.agreements
  for insert with check (
    auth.uid() = borrower_id or auth.uid() = supporter_id
  );
create policy "agreements_update" on public.agreements
  for update using (
    auth.uid() = borrower_id or auth.uid() = supporter_id
  );

-- ==========================================
-- TRIGGER: crear perfil al registrarse
-- ==========================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
