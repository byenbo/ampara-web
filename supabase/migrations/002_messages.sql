-- MESSAGES
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  offer_id   uuid references public.offers(id) on delete cascade not null,
  sender_id  uuid references public.profiles(id) on delete cascade not null,
  content    text not null,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Solo los participantes de la oferta pueden ver y enviar mensajes
create policy "messages_select" on public.messages
  for select using (
    exists (
      select 1 from public.offers o
      join public.requests r on r.id = o.request_id
      where o.id = offer_id
      and (o.supporter_id = auth.uid() or r.user_id = auth.uid())
    )
  );

create policy "messages_insert" on public.messages
  for insert with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.offers o
      join public.requests r on r.id = o.request_id
      where o.id = offer_id
      and (o.supporter_id = auth.uid() or r.user_id = auth.uid())
    )
  );

-- Activar realtime para la tabla messages
alter publication supabase_realtime add table public.messages;
