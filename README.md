# Verdant Finance Tracker

Premium dark + emerald personal finance tracker. React + Vite + Supabase; no Docker required.

## Features
- Supabase email/password sign-up and login
- Income/expense transactions with categories, notes and dates
- Balance, income, expenses, savings rate
- Cashflow chart, spending breakdown, search/filter, CSV export
- PostgreSQL Row Level Security so users can access only their own records
- Responsive UI and Vercel-ready configuration

## Setup
1. Install Node.js LTS from https://nodejs.org/ and Git from https://git-scm.com/downloads.
2. Create a project at https://supabase.com/.
3. In Supabase: SQL Editor → New query. Paste and run `supabase/schema.sql`.
4. Copy the Supabase Project URL and publishable/anon key from the API settings.
5. Copy `.env.example` to `.env`, then fill in:
   `VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co`
   `VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_PUBLISHABLE_OR_ANON_KEY`
6. In Command Prompt, in this project folder, run:
   `npm install`
   `npm run dev`
7. Open the localhost URL shown by Vite (usually http://localhost:5173).

## GitHub
Create an empty repository at https://github.com/new, then in this folder:
```
git init
git add .
git commit -m "Build Verdant finance tracker"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```
Never upload `.env`.

## Vercel
1. Sign in at https://vercel.com/ with GitHub and import this repository.
2. Framework: Vite; build command `npm run build`; output folder `dist`.
3. Add environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Deploy. In Supabase Auth URL settings, add your Vercel domain to allowed redirect URLs if email confirmation is enabled.

## Security
Never expose the Supabase `service_role` key in frontend code. The public anon/publishable key is intended for browser use; RLS policies protect user data. This starter does not connect to banks or move money. Review auth settings, backups and privacy requirements before production use.
