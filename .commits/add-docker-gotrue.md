## Add Docker containerization + GoTrue auth

**Date**: 2026-06-13
**Author**: Vinay Sohaliya

### What changed
- Added `docker-compose.yml` with 3 services: `db` (Postgres 15), `gotrue` (supabase/gotrue v2.158.1), `api` (Hono + Bun)
- Added `docker-compose.dev.yml` for dev overrides with hot-reload volume mounts
- Added `apps/api/Dockerfile` with multi-stage build (`base`, `deps`, `dev`, `runner`)
- Added `.dockerignore`
- Added `docker/postgres/init/00-create-auth-schema.sql` — creates `auth` schema for GoTrue
- Added `.env.example` with all required environment variables
- Added `Makefile` with `up`, `down`, `dev`, `logs`, `build`, `reset` targets
- Updated `apps/api/src/index.ts`:
  - Added auth proxy routes: `POST /auth/signup`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`
  - Added JWT middleware on `/api/*` routes (validates GoTrue-issued JWTs)
  - Added protected routes: `GET /api/me`, `GET /api/protected`

### Why
- Building Supabase-like platform — GoTrue provides production-ready auth (JWT, OAuth, magic links)
- Docker Compose ensures all services start in correct order (DB → GoTrue → API)
- Multi-stage Dockerfile keeps production image lean, dev image supports hot reload
