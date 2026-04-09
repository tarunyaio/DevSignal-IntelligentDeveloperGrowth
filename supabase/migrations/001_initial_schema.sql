-- DevSignal Database Schema
-- Run this in the Supabase SQL Editor

-- 1. Repositories table
create table if not exists public.repositories (
  id uuid default gen_random_uuid() primary key,
  github_id bigint unique not null,
  owner_id uuid references auth.users(id) on delete cascade,
  name text not null,
  description text,
  stars integer default 0,
  forks integer default 0,
  language text,
  url text,
  open_issues integer default 0,
  default_branch text default 'main',
  updated_at timestamptz,
  last_sync timestamptz default now(),
  created_at timestamptz default now()
);

-- 2. Sync history table
create table if not exists public.sync_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  repos_synced integer not null,
  status text not null check (status in ('success', 'failed')),
  error_message text,
  created_at timestamptz default now()
);

-- 3. Resources table (curated learning resources)
create table if not exists public.resources (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  type text not null check (type in ('video', 'article', 'repo', 'course')),
  category text not null,
  duration text,
  difficulty text check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  url text not null,
  rating numeric(2,1) default 0,
  created_at timestamptz default now()
);

-- 4. Snippets table (saved code from editor)
create table if not exists public.snippets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  code text not null,
  language text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. User profiles (synced from auth.users via trigger)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  github_username text,
  avatar_url text,
  display_name text,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_repositories_owner on public.repositories(owner_id);
create index if not exists idx_repositories_language on public.repositories(language);
create index if not exists idx_snippets_user on public.snippets(user_id);
create index if not exists idx_sync_history_user on public.sync_history(user_id);

-- Row Level Security
alter table public.repositories enable row level security;
alter table public.sync_history enable row level security;
alter table public.resources enable row level security;
alter table public.snippets enable row level security;
alter table public.profiles enable row level security;

-- Policies: repositories
create policy "Users can view their own repos"
  on public.repositories for select
  using (auth.uid() = owner_id);

create policy "Service role can manage repos"
  on public.repositories for all
  using (true)
  with check (true);

-- Policies: sync_history
create policy "Users can view their own sync history"
  on public.sync_history for select
  using (auth.uid() = user_id);

-- Policies: resources (public read)
create policy "Anyone can read resources"
  on public.resources for select
  using (true);

-- Policies: snippets
create policy "Users can manage their own snippets"
  on public.snippets for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Policies: profiles
create policy "Users can view all profiles"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, github_username, avatar_url, display_name)
  values (
    new.id,
    new.raw_user_meta_data->>'user_name',
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'user_name')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
