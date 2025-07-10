import { Hono } from 'hono'
import authRouter from "./route"
const app = new Hono()

app.get('/', (c) => {
  return c.json('Hello Hono!')
})
app.route("/auth", authRouter)
export default app
