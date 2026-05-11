-- ============================================================
-- Apex Human — Student Auth Schema
-- Run this once in your Supabase project's SQL Editor
-- Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- 1. Students table
create table if not exists public.students (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade unique not null,
  full_name     text not null default '',
  email         text not null,
  mobile_number text,
  school_company text,
  role_position  text,
  created_at    timestamptz default now() not null
);

-- 2. Row-Level Security — users can only access their own record
alter table public.students enable row level security;

create policy "students_select_own" on public.students
  for select using (auth.uid() = user_id);

create policy "students_update_own" on public.students
  for update using (auth.uid() = user_id);

-- 3. Trigger function: auto-create profile when a user signs up
--    Profile data is passed via options.data in supabase.auth.signUp()
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.students (user_id, full_name, email, mobile_number, school_company, role_position)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    new.raw_user_meta_data->>'mobile_number',
    new.raw_user_meta_data->>'school_company',
    new.raw_user_meta_data->>'role_position'
  );
  return new;
end;
$$;

-- 4. Attach trigger to auth.users
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
