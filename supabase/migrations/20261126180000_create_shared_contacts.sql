create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  constraint contacts_source_format check (source ~ '^[a-z0-9][a-z0-9-]{0,39}$'),
  constraint contacts_name_length check (char_length(name) between 2 and 80),
  constraint contacts_email_length check (char_length(email) between 3 and 120),
  constraint contacts_message_length check (char_length(message) between 10 and 2000)
);

comment on table public.contacts is
  'Shared inbox for personal projects. source identifies the app, for example portfolio or idea-board.';

create index contacts_source_created_at_idx
  on public.contacts (source, created_at desc);

create table public.public_rate_limits (
  bucket text not null,
  key_hash text not null,
  window_start timestamptz not null,
  hits integer not null default 0,
  primary key (bucket, key_hash, window_start),
  constraint public_rate_limits_hits_positive check (hits >= 0)
);

alter table public.contacts enable row level security;
alter table public.public_rate_limits enable row level security;

revoke all on table public.contacts from public, anon, authenticated, service_role;
revoke all on table public.public_rate_limits from public, anon, authenticated, service_role;
grant insert on table public.contacts to anon, authenticated;

create policy contacts_insert_public
  on public.contacts
  for insert
  to anon, authenticated
  with check (
    source ~ '^[a-z0-9][a-z0-9-]{0,39}$'
    and char_length(name) between 2 and 80
    and char_length(email) between 3 and 120
    and char_length(message) between 10 and 2000
  );

create or replace function public.consume_public_rate_limit(
  p_bucket text,
  p_key_hash text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $fn$
declare
  v_window timestamptz;
  v_hits integer;
begin
  if p_bucket is null or p_key_hash is null or p_limit < 1 or p_window_seconds < 1 then
    return false;
  end if;

  delete from public.public_rate_limits
  where window_start < now() - interval '2 days';

  v_window := to_timestamp(
    floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds
  );

  insert into public.public_rate_limits as rate_row (bucket, key_hash, window_start, hits)
  values (p_bucket, p_key_hash, v_window, 1)
  on conflict (bucket, key_hash, window_start)
  do update set hits = rate_row.hits + 1
  returning hits into v_hits;

  return v_hits <= p_limit;
end;
$fn$;

revoke all on function public.consume_public_rate_limit(text, text, integer, integer) from public, anon, authenticated, service_role;
grant execute on function public.consume_public_rate_limit(text, text, integer, integer) to anon, authenticated;
