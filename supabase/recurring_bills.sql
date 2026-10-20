-- Recurring bills and subscriptions for Verdant.
create table if not exists public.recurring_bills (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 title text not null check (char_length(title) between 1 and 100),
 amount numeric(12,2) not null check (amount > 0),
 category text not null default 'Bills',
 cadence text not null default 'monthly' check (cadence in ('weekly','monthly','yearly')),
 next_due date not null,
 active boolean not null default true,
 created_at timestamptz not null default now()
);
create index if not exists recurring_bills_user_due_idx on public.recurring_bills(user_id, active, next_due);
alter table public.recurring_bills enable row level security;
drop policy if exists "Read own recurring bills" on public.recurring_bills;
create policy "Read own recurring bills" on public.recurring_bills for select using ((select auth.uid()) = user_id);
drop policy if exists "Insert own recurring bills" on public.recurring_bills;
create policy "Insert own recurring bills" on public.recurring_bills for insert with check ((select auth.uid()) = user_id);
drop policy if exists "Update own recurring bills" on public.recurring_bills;
create policy "Update own recurring bills" on public.recurring_bills for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "Delete own recurring bills" on public.recurring_bills;
create policy "Delete own recurring bills" on public.recurring_bills for delete using ((select auth.uid()) = user_id);
