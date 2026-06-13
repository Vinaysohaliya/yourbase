# YourBase — Project Instructions

## Stack
- **Runtime**: Bun (`~/.bun/bin/bun`)
- **Framework**: Hono (in `apps/api`)
- **Monorepo**: Turborepo with npm workspaces
- **Language**: TypeScript

## Project Structure
```
yourbase/
├── apps/
│   └── api/          ← Hono API app (Bun runtime)
├── packages/
│   └── shared/       ← Shared utilities/types
├── turbo.json        ← Turbo pipeline
└── CLAUDE.md
```

## Commands
```bash
bun install           # Install all workspace deps
bun run dev           # Start all apps in dev mode (turbo)
bun run build         # Build all apps (turbo)
bun run lint          # Lint all packages (turbo)
bun run typecheck     # Type-check all packages (turbo)
```

## Commit Guidelines
- Every commit must have a corresponding `.md` file in `.commits/`
- File name format: `<short-description>.md` (kebab-case)
- See `.commits/` for examples

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
- Always use `bun` (not `npm` or `node`) to run scripts
- Package names use `@yourbase/<name>` scope
- Keep packages in `packages/`, apps in `apps/`
