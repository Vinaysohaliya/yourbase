# ─── Base ────────────────────────────────────────────────────
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.33.2 --activate
WORKDIR /app

# ─── Dependencies ────────────────────────────────────────────
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/
RUN pnpm install --frozen-lockfile

# ─── Dev (hot reload via docker-compose.dev.yml) ─────────────
FROM deps AS dev
COPY . .
EXPOSE 3000
CMD ["pnpm", "--filter", "@yourbase/api", "dev"]

# ─── Build + Deploy bundle ───────────────────────────────────
FROM deps AS builder
COPY packages/shared ./packages/shared
COPY apps/api ./apps/api
# Compile TypeScript
RUN pnpm --filter @yourbase/api build
# pnpm deploy creates a flat standalone bundle (no symlinks, no virtual store)
RUN pnpm deploy --filter @yourbase/api --prod --legacy /deploy

# ─── Runner (production) ─────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app
# Copy flat deploy bundle (node_modules fully resolved)
COPY --from=builder /deploy ./
# Copy compiled output
COPY --from=builder /app/apps/api/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
