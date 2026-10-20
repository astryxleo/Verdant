# Verdant — Personal Finance, with clarity

![Verdant](https://img.shields.io/badge/Verdant-Personal%20Finance-5ce0a1?style=for-the-badge&labelColor=08110c)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Postgres%20%2B%20Auth-3FCF8E?logo=supabase&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

Verdant is a privacy-minded personal finance dashboard built with React, Vite, Supabase Auth, and PostgreSQL. It focuses on a calm, premium black-and-emerald interface and fast everyday money tracking.

## Product capabilities

- **Private accounts:** email/password sign-up and sign-in with Supabase Auth.
- **Transaction ledger:** record income and expenses with categories, dates, and notes.
- **Financial overview:** balance, income, expenses, savings rate, weekly cashflow, and category breakdown.
- **Find and export:** search transactions, filter by type, export a CSV.
- **Monthly intelligence:** selectable month, income/expense/net-cashflow totals, category insights, and comparison with the previous month.
- **Budgets and goals:** monthly category spending limits, overspend indicators, savings goals, progress tracking, and optional target dates.
- **Quality checks:** Node built-in unit tests for financial calculation helpers and a GitHub Actions test/build workflow.
- **Responsive interface:** dark UI with loading, empty, and feedback states.
- **Data access boundaries:** PostgreSQL Row Level Security policies are defined in `supabase/schema.sql`.
- **Deployable without Docker:** Vite production build, GitHub source control, and Vercel hosting.

## Tech stack

| Layer | Technology |
| --- | --- |
| UI | React 18, CSS, Lucide |
| Charts | Recharts |
| Build | Vite |
| Auth and data | Supabase Auth, PostgreSQL, RLS |
| Hosting | Vercel |
| Quality gate | GitHub Actions production build |

## Run locally

### Prerequisites
- Node.js 20+ (LTS recommended)
- A Supabase project

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Supabase
Create a Supabase project, then run `supabase/schema.sql` in **SQL Editor**. If the original schema is already installed, run `supabase/phase3.sql` to add budgets and savings goals; do not re-run the original schema blindly because its original policies may already exist.

Copy `.env.example` to `.env` and fill in your project's browser-safe values:
```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_PUBLISHABLE_OR_ANON_KEY
```

Use the public publishable/anon key only. Never put a Supabase secret or `service_role` key in a Vite environment variable: `VITE_*` values are shipped to browsers.

### 3. Start the development server
```bash
npm run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

### 4. Verify a production build
```bash
npm test
npm run build
npm run preview
```

## Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. Choose **Vite**, build command `npm run build`, and output directory `dist`.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel's environment-variable settings for the environments you use.
4. Deploy and open the generated URL.
5. In Supabase Auth URL configuration, set the deployed site's URL and any required redirect URLs.

## Security and product scope

- Keep Row Level Security enabled; review every table policy before launch.
- Do not expose service-role keys or other server secrets in the browser.
- Test account isolation with two separate test accounts.
- The Phase 3 migration creates separate user-owned tables with row-level security and policies for select, insert, update, and delete.
- This app records manually entered transactions; it does not connect to banks or move money.
- This is a portfolio project, not financial advice. Review authentication, privacy, backup, accessibility, and applicable compliance requirements before handling real customer data.

## Roadmap

- Monthly and custom date-range analytics
- Budget limits and savings goals
- Transaction editing and pagination
- Automated tests for calculations, filtering, and data access
- Accessible keyboard flows and reduced-motion support

## Contributing

Use a feature branch, keep changes focused, and verify `npm run build` before opening a pull request. Never commit `.env`, credentials, or real financial data.
