import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import "dotenv/config"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})
export const users = pgTable('users', {
    id: text('id').primaryKey(),
    name: text('name'),
    email: text('email').unique().notNull(),
    profile: text('profile'),
    createAt: timestamp('created_at').defaultNow()
})
export const feedback = pgTable('feedback', {
    id: text('id').primaryKey(),
    message: text('message'),
    createdAt: text('created_at').notNull(),
})
export const db = drizzle(pool, { schema: { users, feedback } })