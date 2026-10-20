-- Verdant Phase 3 migration: monthly budgets and savings goals.
-- Run this file in Supabase SQL Editor after the original schema.sql.
create extension if not exists pgcrypto;

create table if not exists public.monthly_budgets (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 category text not null,
 month date not null check (extract(day from month)=1),
 amount numeric(12,2) not null check (amount > 0),
 created_at timestamptz not null default now(),
 unique(user_id, category, month)
);
create index if not exists monthly_budgets_user_month_idx on public.monthly_budgets(user_id, month desc);
alter table public.monthly_budgets enable row level security;
drop policy if exists "Read own budgets" on public.monthly_budgets;
create policy "Read own budgets" on public.monthly_budgets for select using (auth.uid() = user_id);
drop policy if exists "Insert own budgets" on public.monthly_budgets;
create policy "Insert own budgets" on public.monthly_budgets for insert with check (auth.uid() = user_id);
drop policy if exists "Update own budgets" on public.monthly_budgets;
create policy "Update own budgets" on public.monthly_budgets for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Delete own budgets" on public.monthly_budgets;
create policy "Delete own budgets" on public.monthly_budgets for delete using (auth.uid() = user_id);

create table if not exists public.savings_goals (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 title text not null check (char_length(title) between 1 and 100),
 target_amount numeric(12,2) not null check (target_amount > 0),
 saved_amount numeric(12,2) not null default 0 check (saved_amount >= 0 and saved_amount <= target_amount),
 target_date date,
 created_at timestamptz not null default now()
);
create index if not exists savings_goals_user_created_idx on public.savings_goals(user_id, created_at desc);
alter table public.savings_goals enable row level security;
drop policy if exists "Read own goals" on public.savings_goals;
create policy "Read own goals" on public.savings_goals for select using (auth.uid() = user_id);
drop policy if exists "Insert own goals" on public.savings_goals;
create policy "Insert own goals" on public.savings_goals for insert with check (auth.uid() = user_id);
drop policy if exists "Update own goals" on public.savings_goals;
create policy "Update own goals" on public.savings_goals for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Delete own goals" on public.savings_goals;
create policy "Delete own goals" on public.savings_goals for delete using (auth.uid() = user_id);
