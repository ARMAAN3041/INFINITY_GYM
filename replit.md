# Infinity Gym Kaithal

A gym website and backend for Infinity Gym Kaithal, built as a pnpm monorepo.

## Project structure

- `artifacts/infinity-gym` — React + Vite frontend (the public gym website)
- `artifacts/api-server` — Express + TypeScript API backend

## How to run

Both services start automatically via their configured workflows:

- **Frontend**: `pnpm --filter @workspace/infinity-gym run dev`  
  Served at the `/` preview path.
- **API Server**: `pnpm install && pnpm --filter @workspace/api-server run dev`  
  Served at the `/api` preview path. Health check: `GET /api/healthz`

## Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, shadcn/ui, Framer Motion, TanStack Query, Wouter
- **Backend**: Express 5, TypeScript, Pino logger, Drizzle ORM (wired, no DB connected yet)
- **Monorepo**: pnpm workspaces with shared libraries under `lib/`

## User preferences
