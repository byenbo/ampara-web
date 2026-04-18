alter table public.messages add column if not exists attachment_url text;
alter table public.messages add column if not exists attachment_type text check (attachment_type in ('image', 'file'));
