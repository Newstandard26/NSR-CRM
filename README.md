# New Standard Restoration CRM

Custom CRM replacing AccuLynx for New Standard Restoration. Next.js (App
Router) + Supabase, deployed to Vercel.

## Phase 1 — The Shell + Workflow Engine + Multi-location ✅

This is the foundational skeleton:

- **Auth** — email/password sign-in, sign-up, password reset (Supabase Auth).
  The first account created is bootstrapped as Company Administrator across
  every location.
- **Multi-location** — `company → location` model (parent + IL/FL/MO/WI +
  Training) with a header location switcher; every record carries a location
  scope.
- **RBAC + RLS** — location-scoped roles (Company Administrator, Sales,
  Production, Accounting, Crew, Viewer) with Row-Level Security on every table
  and per-status advancement gating.
- **Workflow engine** — `milestone → status → status_work_type → checklist_item`
  modeled as data and **seeded from Appendix A**. The Insurance-vs-Retail branch
  is the `status_work_type` join. Viewable under Settings → Workflow Manager.
- **Activity log** — universal append-only `activity_log` + `log_activity()`
  helper used across the app.
- **Custom fields** — `custom_field_definition` / `custom_field_value` for jobs
  and contacts.
- **App shell** — top nav (Dashboard, Contacts, Leads, Jobs, Photos, Track,
  ReportsPlus, Production, Tools), settings admin screens, placeholder section
  pages mapped to their roadmap phases.

## Stack

| Layer     | Choice                              |
| --------- | ----------------------------------- |
| Database  | Supabase Postgres (RLS)             |
| Auth      | Supabase Auth                       |
| Frontend  | Next.js App Router + React 19       |
| Styling   | Tailwind CSS v4                     |
| Hosting   | Vercel                              |

## Local development

```bash
cp .env.example .env.local   # fill in the Supabase URL + anon key
npm install
npm run dev
```

### Environment variables

| Variable                        | Where    | Purpose                              |
| ------------------------------- | -------- | ------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | client   | Supabase project URL                 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client   | Publishable / anon key               |
| `SUPABASE_SERVICE_ROLE_KEY`     | server   | Optional — enables team email invites|

## Database

Schema and the Appendix A seed are applied as Supabase migrations. Key tables:
`company`, `location`, `app_user`, `role`, `permission`, `user_location`,
`work_type`, `milestone`, `status`, `status_work_type`, `checklist_item`,
`status_permission`, `activity_log`, `custom_field_definition`,
`custom_field_value`, plus per-location config reference tables.

## Roadmap

Phase 1 (this) → Contacts → Leads/Jobs/Workflow → Job workspace → Estimating →
Worksheets/Financials → Invoicing/Payments → E-signature → QuickBooks →
Reporting/Portal/Migration. See the project roadmap document for detail.
