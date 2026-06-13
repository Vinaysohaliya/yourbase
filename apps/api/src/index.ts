import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { logger } from 'hono/logger'

const app = new Hono()

const JWT_SECRET = process.env.JWT_SECRET ?? 'super-secret-jwt-token-change-in-production'
const GOTRUE_URL = process.env.GOTRUE_URL ?? 'http://localhost:9999'
const PORT = Number(process.env.PORT ?? 3000)

app.use('*', logger())

// ─── Public routes ──────────────────────────────────────────
app.get('/', (c) => c.json({ service: 'yourbase-api', status: 'ok' }))

app.get('/health', (c) => c.json({ status: 'ok' }))

// ─── Auth proxy routes (forward to GoTrue) ──────────────────
app.post('/auth/signup', async (c) => {
  const body = await c.req.json()
  const res = await fetch(`${GOTRUE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return c.json(data, res.status as any)
})

app.post('/auth/login', async (c) => {
  const body = await c.req.json()
  const res = await fetch(`${GOTRUE_URL}/token?grant_type=password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return c.json(data, res.status as any)
})

app.post('/auth/refresh', async (c) => {
  const body = await c.req.json()
  const res = await fetch(`${GOTRUE_URL}/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return c.json(data, res.status as any)
})

app.post('/auth/logout', async (c) => {
  const authHeader = c.req.header('Authorization') ?? ''
  const res = await fetch(`${GOTRUE_URL}/logout`, {
    method: 'POST',
    headers: { Authorization: authHeader },
  })
  return c.json({ message: 'Logged out' }, res.status as any)
})

// ─── Protected routes (require valid GoTrue JWT) ─────────────
app.use('/api/*', jwt({ secret: JWT_SECRET, alg: 'HS256' }))

app.get('/api/me', (c) => {
  const payload = c.get('jwtPayload')
  return c.json({ user: payload })
})

app.get('/api/protected', (c) => {
  return c.json({ message: 'You are authenticated!', timestamp: new Date().toISOString() })
})

serve({ fetch: app.fetch, port: PORT }, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
