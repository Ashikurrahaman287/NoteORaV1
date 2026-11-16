# Noteora – Smart Data Analytics

## Overview

Noteora is a business intelligence and data analytics SaaS platform that helps teams track, analyze, visualize, and understand business data through clean dashboards, smart reports, and AI-powered insights.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/noteora) — routed at `/`
- **API framework**: Express 5 (artifacts/api-server) — routed at `/api`
- **Database**: PostgreSQL + Drizzle ORM
- **Authentication**: Clerk (Replit-managed)
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **UI**: shadcn/ui + Tailwind CSS v4

## Architecture

```
artifacts/
  api-server/      — Express backend (port 8080, path /api)
    src/
      routes/      — projects, datasets, charts, reports, notifications, analytics
      middlewares/ — clerkProxyMiddleware, requireAuth
  noteora/         — React+Vite frontend (port 23281, path /)
    src/
      pages/       — dashboard, projects, datasets, analytics, reports, notifications, settings, landing, not-found
      components/  — layout/Sidebar, layout/AppLayout, error-boundary, ui/*
lib/
  api-spec/        — OpenAPI spec (openapi.yaml) + Orval config
  api-client-react/ — Generated React Query hooks
  api-zod/         — Generated Zod validation schemas
  db/              — Drizzle schema + migrations
    src/schema/    — projects, datasets, charts, reports, notifications, activity
```

## Database Schema

- **projects** — user projects with name, description, status
- **datasets** — uploaded/imported datasets with columns and row count
- **dataset_rows** — individual data rows (jsonb)
- **charts** — saved charts with type, axes, config, dashboard pinning
- **reports** — generated reports with chart references
- **notifications** — user notifications
- **activity** — user activity feed

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Features

- User authentication (Clerk) with email/password and Google SSO
- Main dashboard with KPI cards + trend badges, area chart, AI insights, recent activity feed
- Project management (create/edit/delete, status tracking)
- Dataset management (CSV/Excel/manual/API, data preview)
- Analytics builder with multiple chart types (line, bar, pie, area, donut, KPI)
- Report generation with date ranges and chart attachments
- Notification center with mark-read functionality
- User settings with dark/light mode toggle
- Branded 404 page with navigation shortcuts

## Landing Page Sections

1. **Sticky frosted nav** — logo, How it works / Features / Pricing / Reviews links, Log in + Get Started CTA
2. **Hero** — instant-animate (no whileInView), aurora gradient background, blue-to-cyan gradient headline, dashboard mockup
3. **Stats bar** — 4 metrics with gradient numbers
4. **How it works** — 3-step import → visualize → share flow
5. **Features grid** — 6 feature cards with coloured icon backgrounds
6. **Testimonials** — 3 cards with star ratings and avatars
7. **Pricing** — 3 tiers, Pro highlighted with amber "Most Popular" badge
8. **CTA section** — gradient aurora background, two buttons
9. **Footer** — 4-column with logo, social icons, copyright, compliance badges

## Branding

- **Logo**: `/noteora-logo.png` in public dir — used in landing nav/footer/mockup, app sidebar (desktop+mobile), Clerk auth screens
- **Favicon**: `/favicon.svg` — NoteOra blue-to-cyan gradient icon with stylized "N" and dot
- **Primary color**: `hsl(220 85% 57%)` — brand blue
- **Sidebar**: Dark navy (`hsl(222 60% 10%)`) in both light and dark mode — matches logo gradient

## Security (API Server)

- `helmet` with CSP (production only)
- `express-rate-limit` — 300 req/15min global, 20 req/min on auth routes
- CORS via `ALLOWED_ORIGINS` env var
- Body limit 2MB

## Authentication

Uses Replit-managed Clerk. The Clerk proxy runs at `/api/__clerk`. Sign-in/sign-up at `/sign-in` and `/sign-up`. Logo displayed in Clerk auth card via `logoImageUrl`.

## SEO / Meta

- `index.html` includes meta description, Open Graph tags, Twitter card, favicon link, apple-touch-icon
- `theme-color` set to `#1e3a8a` (dark navy)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Vercel Deployment

The project is fully configured for Vercel deployment via `vercel.json` at the repo root.

### How it works

| Concern | Solution |
|---|---|
| Frontend build | `BASE_PATH=/ pnpm run build:vercel` → `artifacts/noteora/dist/public` |
| API routes | `api/index.ts` serverless function — wraps the Express app, handles all `/api/*` |
| SPA routing | Vercel rewrite `/:path* → /index.html` |
| Assets | `Cache-Control: immutable, 1 year` on `/assets/*` |
| Security headers | HSTS, X-Frame-Options, CSP, Referrer-Policy on all routes |

### Environment variables to set in Vercel dashboard

| Variable | Where | Notes |
|---|---|---|
| `DATABASE_URL` | Runtime | Use Neon or Supabase for serverless-compatible Postgres |
| `CLERK_PUBLISHABLE_KEY` | Runtime | From Clerk dashboard |
| `CLERK_SECRET_KEY` | Runtime | From Clerk dashboard |
| `VITE_CLERK_PUBLISHABLE_KEY` | **Build + Runtime** | Must be marked as a Build variable in Vercel |
| `VITE_CLERK_PROXY_URL` | Build | `https://your-app.vercel.app/api/__clerk` |
| `ALLOWED_ORIGINS` | Runtime | Your production domain(s), comma-separated |
| `SESSION_SECRET` | Runtime | 32+ random hex chars |

`BASE_PATH` is automatically injected by the `buildCommand` in `vercel.json` — no need to set it in the dashboard.

### Key files

- `vercel.json` — Build command, output dir, function config, rewrites, security headers
- `api/index.ts` — Vercel serverless function entry point (imports Express app)
- `artifacts/noteora/vite.config.ts` — PORT/BASE_PATH only required for dev server, not build
- `artifacts/noteora/public/robots.txt` — SEO: blocks app routes from crawlers
- `artifacts/noteora/public/sitemap.xml` — SEO: all public marketing pages
- `.env.example` — Documents every required environment variable
