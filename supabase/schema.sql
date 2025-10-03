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
