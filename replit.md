# Infinity Gym Kaithal

A gym website for Infinity Fitness Gym in Kaithal, featuring program listings, trainer profiles, pricing, and a call-to-action to join.

## Run & Operate

- `pnpm install` — install all workspace dependencies (run once after cloning/importing)
- `pnpm --filter @workspace/infinity-gym run dev` — run the gym website frontend (managed via the "infinity-gym: web" workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (requires `DATABASE_URL`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes to the database (dev only)

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (required for the API server and DB package)
- `SESSION_SECRET` — session signing secret (available as a Replit secret)
- `PORT` — assigned automatically per artifact by Replit; do not hardcode
- `BASE_PATH` — assigned automatically per artifact by Replit; do not hardcode

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19, Vite 7, Tailwind CSS v4, shadcn/ui, Wouter, TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod, drizzle-zod
- API codegen: Orval (from OpenAPI spec at `lib/api-spec/openapi.yaml`)
- Build: esbuild (CJS bundle for API server)

## Where things live

- `artifacts/infinity-gym/` — React/Vite gym website frontend
- `artifacts/api-server/` — Express API server
- `lib/db/` — Drizzle ORM schema and database client
- `lib/api-spec/` — OpenAPI spec + Orval codegen config
- `lib/api-client-react/` — generated TanStack Query hooks (from codegen)
- `lib/api-zod/` — generated Zod schemas (from codegen)
- `attached_assets/` — images used by the gym website (hero, programs, trainers)

## Architecture decisions

- Path-based routing: the frontend is served at `/` and the API at `/api`. Both read `PORT` and `BASE_PATH` from environment variables injected by Replit's artifact system — never hardcode these.
- The frontend imports images from `attached_assets/` via the `@assets` alias defined in `vite.config.ts`.
- API client code is generated from the OpenAPI spec — edit `lib/api-spec/openapi.yaml` and run codegen rather than hand-writing fetch calls.

## Gotchas

- Run `pnpm install` from the workspace root (not inside individual packages) to set up all dependencies correctly.
- The API server will not start without `DATABASE_URL` set. The gym website frontend runs independently of the API.
- `PORT` and `BASE_PATH` are injected at runtime by Replit — the vite config and API server will throw if they are missing.

## Troubleshooting

**Workflows fail with "vite: command not found" or "node_modules missing"**
This happens after a zip import or fresh clone — `node_modules` are not bundled.
Fix: run `pnpm install` from the workspace root, then restart the workflows.

**API server fails with "Cannot find package 'esbuild'"**
Same root cause as above — `node_modules` absent. Run `pnpm install` first.

**API server crashes on startup with "DATABASE_URL must be set"**
The API server requires a PostgreSQL database. Provision one via Replit's database tool and ensure `DATABASE_URL` is set as a secret. The frontend (`infinity-gym`) runs independently and does not need the database.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._
