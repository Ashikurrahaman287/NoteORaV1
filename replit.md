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
      pages/       — dashboard, projects, datasets, analytics, reports, notifications, settings, landing
      components/  — shared UI components
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
- Main dashboard with KPI cards, trend charts, activity feed, AI insights
- Project management (create/edit/delete, status tracking)
- Dataset management (CSV/Excel import, manual entry, data preview)
- Analytics builder with multiple chart types (line, bar, pie, area, donut, KPI)
- Report generation
- Notification center
- Dark/light mode

## Authentication

Uses Replit-managed Clerk. The Clerk proxy runs at `/api/__clerk`. Sign-in/sign-up at `/sign-in` and `/sign-up`.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
