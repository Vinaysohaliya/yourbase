.PHONY: up down dev logs ps build reset

# ─── Production ──────────────────────────────────────────────
up:
	docker compose up -d

down:
	docker compose down

# ─── Development (hot reload) ────────────────────────────────
dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# ─── Utilities ───────────────────────────────────────────────
logs:
	docker compose logs -f

logs-api:
	docker compose logs -f api

logs-auth:
	docker compose logs -f gotrue

logs-db:
	docker compose logs -f db

ps:
	docker compose ps

build:
	docker compose build --no-cache

# ─── Reset (wipes volumes — destructive!) ────────────────────
reset:
	docker compose down -v
	docker compose up -d
