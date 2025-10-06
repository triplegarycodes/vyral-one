-- Schema for Vyral Supabase backend
create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  username text unique not null,
  email text unique not null,
  avatar_url text,
  xp int default 0,
  created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now()
);

create table if not exists challenges (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  xp_reward int default 0,
  created_at timestamptz default now()
);

create table if not exists challenge_participants (
  id uuid primary key default uuid_generate_v4(),
  challenge_id uuid references challenges(id) on delete cascade not null,
  user_id uuid references users(id) on delete cascade not null,
  joined_at timestamptz default now(),
  unique (challenge_id, user_id)
);

create table if not exists streaks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade not null,
  count int default 0,
  last_checked date default current_date
);

create table if not exists entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade not null,
  content text,
  created_at timestamptz default now()
);

create table if not exists habits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade not null,
  title text,
  value int,
  created_at timestamptz default now()
);

create table if not exists habit_logs (
  id uuid primary key default uuid_generate_v4(),
  habit_id uuid references habits(id) on delete cascade not null,
  user_id uuid references users(id) on delete cascade not null,
  logged_at timestamptz default now()
);

create table if not exists tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade not null,
  title text,
  status text default 'todo',
  created_at timestamptz default now()
);

create table if not exists customizations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade not null,
  theme text,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists focus_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade not null,
  duration_minutes int not null,
  created_at timestamptz default now()
);

create table if not exists xp_transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade not null,
  amount int not null,
  source text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_xp_transactions_user_created_at on xp_transactions (user_id, created_at desc);

create or replace function grant_xp(
  p_user_id uuid,
  p_amount int,
  p_source text,
  p_metadata jsonb default '{}'::jsonb
)
returns int
language plpgsql
as $$
declare
  new_xp int;
begin
  if p_amount is null then
    raise exception 'XP amount is required';
  end if;

  insert into xp_transactions (user_id, amount, source, metadata)
  values (p_user_id, p_amount, coalesce(p_source, 'unknown'), coalesce(p_metadata, '{}'::jsonb));

  update users
  set xp = coalesce(xp, 0) + p_amount
  where id = p_user_id
  returning xp into new_xp;

  return coalesce(new_xp, 0);
end;
$$;
