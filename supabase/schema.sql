create extension if not exists pgcrypto;
create table if not exists public.transactions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 title text not null check (char_length(title) between 1 and 100),
 amount numeric(12,2) not null check (amount > 0),
 type text not null check (type in ('income','expense')),
 category text not null default 'Other',
 transaction_date date not null default current_date,
 note text,
 created_at timestamptz not null default now()
);
create index if not exists transactions_user_date_idx on public.transactions(user_id,transaction_date desc);
alter table public.transactions enable row level security;
create policy "Read own transactions" on public.transactions for select using (auth.uid() = user_id);
create policy "Insert own transactions" on public.transactions for insert with check (auth.uid() = user_id);
create policy "Update own transactions" on public.transactions for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Delete own transactions" on public.transactions for delete using (auth.uid() = user_id);
