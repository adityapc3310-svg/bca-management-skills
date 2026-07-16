-- BCA Management Skills — Supabase schema
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)
-- Safe to run multiple times (idempotent).

create extension if not exists "pgcrypto";

-- ============================================================================
-- 1) Newsletter signups (homepage CTA button + any inline subscribe form)
-- ============================================================================
create table if not exists public.newsletter_subscribers (
  id           uuid primary key default gen_random_uuid(),
  email        text not null unique,
  source       text,                       -- 'cta' | 'footer' | 'inline' | etc.
  referrer     text,
  user_agent   text,
  created_at   timestamptz not null default now(),
  confirmed_at timestamptz
);

create index if not exists newsletter_email_idx on public.newsletter_subscribers (lower(email));
create index if not exists newsletter_created_idx on public.newsletter_subscribers (created_at desc);

alter table public.newsletter_subscribers enable row level security;

-- Anonymous visitors may INSERT (signup) but never SELECT/UPDATE/DELETE.
drop policy if exists "newsletter_insert_anon" on public.newsletter_subscribers;
create policy "newsletter_insert_anon"
  on public.newsletter_subscribers for insert
  to anon, authenticated
  with check (email is not null and length(email) between 5 and 254);

-- Optional: look up own row by email confirmation token (future use).
drop policy if exists "newsletter_select_confirmed" on public.newsletter_subscribers;
create policy "newsletter_select_confirmed"
  on public.newsletter_subscribers for select
  to authenticated
  using (auth.jwt() ->> 'email' = email);

-- ============================================================================
-- 2) Admissions enquiries ("Apply Now" CTA)
-- ============================================================================
create table if not exists public.admissions_inquiries (
  id            uuid primary key default gen_random_uuid(),
  full_name     text not null,
  email         text not null,
  phone         text,
  current_year  text,        -- e.g. '2nd year BCA'
  intended_start text,       -- e.g. 'Next intake — Q1 2026'
  message       text,
  source_page   text,        -- e.g. '/', '/contact'
  referrer      text,
  user_agent    text,
  status        text not null default 'new' check (status in ('new','reviewing','accepted','rejected')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists admissions_email_idx on public.admissions_inquiries (lower(email));
create index if not exists admissions_status_idx on public.admissions_inquiries (status);
create index if not exists admissions_created_idx on public.admissions_inquiries (created_at desc);

alter table public.admissions_inquiries enable row level security;

drop policy if exists "admissions_insert_anon" on public.admissions_inquiries;
create policy "admissions_insert_anon"
  on public.admissions_inquiries for insert
  to anon, authenticated
  with check (full_name is not null and length(full_name) between 2 and 120
              and email is not null and length(email) between 5 and 254);

-- updated_at trigger
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists admissions_touch on public.admissions_inquiries;
create trigger admissions_touch
  before update on public.admissions_inquiries
  for each row execute function public.touch_updated_at();

-- ============================================================================
-- 3) General contact messages (footer mailto links / future contact form)
-- ============================================================================
create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  email       text not null,
  subject     text,
  message     text not null,
  topic       text,       -- 'admissions' | 'partnerships' | 'careers' | 'general'
  referrer    text,
  user_agent  text,
  created_at  timestamptz not null default now()
);

create index if not exists contact_email_idx on public.contact_submissions (lower(email));
create index if not extends contact_created_idx on public.contact_submissions (created_at desc);
create index if not exists contact_topic_idx on public.contact_submissions (topic);

alter table public.contact_submissions enable row level security;

drop policy if exists "contact_insert_anon" on public.contact_submissions;
create policy "contact_insert_anon"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (email is not null and length(email) between 5 and 254
              and message is not null and length(message) between 1 and 5000);

-- ============================================================================
-- Done.
-- Next steps in Supabase dashboard:
--   Project Settings → API → copy "Project URL" and "anon public" key
--   Paste into /config.js (committed to repo — anon key is safe to expose).
-- ============================================================================
