-- Tabla para rastrear última vez que cada usuario leyó cada chat
create table if not exists public.offer_read_receipts (
  offer_id     uuid references public.offers(id) on delete cascade,
  user_id      uuid references public.profiles(id) on delete cascade,
  last_read_at timestamptz not null default now(),
  primary key (offer_id, user_id)
);

alter table public.offer_read_receipts enable row level security;

create policy "read_receipts_own" on public.offer_read_receipts
  for all using (auth.uid() = user_id);

-- Función que devuelve el total de mensajes no leídos para un usuario
create or replace function public.get_unread_count(user_id_param uuid)
returns integer
language sql
security definer
as $$
  select count(*)::integer
  from public.messages m
  join public.offers o on o.id = m.offer_id
  join public.requests req on req.id = o.request_id
  left join public.offer_read_receipts r
    on r.offer_id = m.offer_id and r.user_id = user_id_param
  where m.sender_id != user_id_param
  and (o.supporter_id = user_id_param or req.user_id = user_id_param)
  and (r.last_read_at is null or m.created_at > r.last_read_at);
$$;
