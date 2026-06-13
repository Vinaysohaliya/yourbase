## Init monorepo with Turborepo, Hono, and Bun

**Date**: 2026-06-13
**Author**: Vinay Sohaliya

### What changed
- Initialized npm workspaces monorepo at root
- Installed Turbo (`turbo@^2.9.18`) as dev dependency
- Added `turbo.json` with `build`, `dev`, `lint`, `typecheck` tasks
- Created `apps/api` — Hono app targeting Bun runtime
- Created `packages/shared` — shared utilities package
- Installed Bun `v1.3.14` via official installer
- Ran `bun install` to migrate lockfile and install all workspace deps
- Added `CLAUDE.md` with project instructions and commit conventions
- Added `.commits/` folder for per-commit documentation
