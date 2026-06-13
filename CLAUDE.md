# YourBase — Project Instructions

## Stack
- **Package Manager**: pnpm@10.33.2 (use `pnpm`, never `npm` or `bun`)
- **Runtime**: Node.js 22 (local), `node:22-alpine` (Docker)
- **Framework**: Hono + `@hono/node-server` (in `apps/api`)
- **Auth**: GoTrue (supabase/gotrue v2.x) — runs on port 9999
- **Database**: PostgreSQL 15 (Docker)
- **Monorepo**: Turborepo + pnpm workspaces
- **Containers**: Docker Compose
- **Language**: TypeScript

## Project Structure
```
yourbase/
├── apps/
│   └── api/                  ← Hono API app (Node.js runtime, port 3000)
│       ├── src/index.ts
│       ├── tsconfig.json
│       ├── Dockerfile
│       └── package.json
├── packages/
│   └── shared/               ← Shared utilities/types
├── docker/
│   └── postgres/init/        ← SQL init scripts run on first DB start
├── docker-compose.yml        ← Production services
├── docker-compose.dev.yml    ← Dev overrides (hot reload)
├── Makefile                  ← Convenience commands
├── pnpm-workspace.yaml       ← pnpm workspace config
├── .env                      ← Local env (gitignored)
├── .env.example              ← Env template (committed)
├── turbo.json                ← Turbo pipeline
└── CLAUDE.md
```

## Services
| Service | Container | Port | Purpose |
|---|---|---|---|
| Postgres | `yourbase_db` | 5433 | Main database (local port 5433 — 5432 taken) |
| GoTrue | `yourbase_gotrue` | 9999 | Auth (JWT, signup, login) |
| Hono API | `yourbase_api` | 3000 | App API |

## API Routes
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | public | Service info |
| GET | `/health` | public | Health check |
| POST | `/auth/signup` | public | Register user |
| POST | `/auth/login` | public | Login → returns JWT |
| POST | `/auth/refresh` | public | Refresh token |
| POST | `/auth/logout` | public | Logout |
| GET | `/api/me` | JWT required | Get current user |
| GET | `/api/protected` | JWT required | Example protected route |

## Commands
```bash
# Local dev
pnpm install          # Install all workspace deps
pnpm dev              # Start all apps in dev mode (turbo)
pnpm build            # Build all apps (turbo)
pnpm typecheck        # Type-check all packages (turbo)

# Docker
make up               # Start all services (detached)
make down             # Stop all services
make dev              # Start with hot reload (foreground)
make logs             # Tail all logs
make logs-api         # Tail API logs only
make logs-auth        # Tail GoTrue logs only
make build            # Rebuild images (no cache)
make reset            # Wipe volumes and restart (destructive!)
```

## Commit Guidelines
- Every commit must have a corresponding `.md` file in `.commits/`
- File name format: `<short-description>.md` (kebab-case)

### Commit Note Template
```md
## <commit title>

**Date**: YYYY-MM-DD
**Author**: <name>

### What changed
- ...

### Why
- ...
```

## Conventions
- Always use `pnpm` (never `npm`, `bun`, or `yarn`) to run scripts
- Package names use `@yourbase/<name>` scope
- Keep packages in `packages/`, apps in `apps/`
- JWT secret must match between GoTrue (`GOTRUE_JWT_SECRET`) and API (`JWT_SECRET`)
- Docker: `pnpm deploy --prod --legacy` required in Dockerfile (pnpm v10 flat bundle for Docker)
