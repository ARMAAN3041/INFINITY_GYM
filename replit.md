# Infinity Gym Kaithal

A gym website for Infinity Gym Kaithal — a fitness center in Kaithal, India.

## Stack
- **Frontend**: React + Vite + Tailwind CSS (shadcn/ui), Wouter routing, TanStack Query
- **Backend**: Express 5 (TypeScript), built with esbuild
- **Database**: PostgreSQL via Drizzle ORM
- **Monorepo**: pnpm workspaces

## Project structure
```
artifacts/
  infinity-gym/   # React frontend (web)
  api-server/     # Express API backend
  mockup-sandbox/ # Design canvas sandbox
lib/
  db/             # Drizzle schema + DB client
  api-spec/       # API spec
  api-zod/        # Zod validators
  api-client-react/ # React API client hooks
```

## How to run
All workflows are pre-configured and start automatically:
- **Frontend**: `pnpm --filter @workspace/infinity-gym run dev`
- **API**: `pnpm --filter @workspace/api-server run dev`

## Environment variables
- `DATABASE_URL` — PostgreSQL connection string (provisioned by Replit)
- `SESSION_SECRET` — session signing secret
- `PORT` — assigned automatically per artifact by Replit

## User preferences
