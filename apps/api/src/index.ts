import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Hello from Hono + Bun!' })
})

export default {
  port: 3000,
  fetch: app.fetch,
}
