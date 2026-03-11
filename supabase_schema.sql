-- ============================================================
-- CodeType Learn — Progress Tracking Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Students table
-- One row per user. Matches the hardcoded usernames in auth.ts.
create table if not exists students (
  id          uuid primary key default gen_random_uuid(),
  username    text unique not null,           -- 'yohan', 'seonghyun', 'admin'
  display_name text not null,
  role        text not null default 'student' check (role in ('student', 'admin')),
  created_at  timestamptz not null default now()
);

-- Seed the three hardcoded users
insert into students (username, display_name, role) values
  ('yohan',      'Yohan',      'student'),
  ('seonghyun',  'Seonghyun',  'student'),
  ('admin',      'Admin',      'admin')
on conflict (username) do nothing;

-- Quiz attempts table
-- One row per (student, module, question). Upserted on every answer.
create table if not exists quiz_attempts (
  id              uuid primary key default gen_random_uuid(),
  student_id      uuid not null references students(id) on delete cascade,
  module_slug     text not null,   -- '0', '1', '2', etc.
  question_id     text not null,   -- 'q0-1', 'q1-3', etc.
  selected_answer text not null,
  is_correct      boolean not null,
  answered_at     timestamptz not null default now(),

  -- Only one answer per student per question (latest wins on upsert)
  unique (student_id, module_slug, question_id)
);

-- Index for fast per-student lookups
create index if not exists quiz_attempts_student_idx
  on quiz_attempts (student_id);

-- Index for per-student per-module lookups (dashboard + quiz load)
create index if not exists quiz_attempts_student_module_idx
  on quiz_attempts (student_id, module_slug);

-- ============================================================
-- Row Level Security
-- Allow anonymous reads/writes only for the matching student_id.
-- Since we use the anon key (no Supabase Auth), we keep it simple:
-- the client passes student_id and we trust it. For a tutoring app
-- with known students this is fine. Upgrade to Supabase Auth later.
-- ============================================================

alter table students enable row level security;
alter table quiz_attempts enable row level security;

-- Students: anyone with the anon key can read all rows (needed to look up by username)
create policy "students_read_all" on students
  for select using (true);

-- Quiz attempts: anyone can insert/update/select (student_id is validated app-side)
create policy "attempts_select" on quiz_attempts
  for select using (true);

create policy "attempts_insert" on quiz_attempts
  for insert with check (true);

create policy "attempts_update" on quiz_attempts
  for update using (true);
