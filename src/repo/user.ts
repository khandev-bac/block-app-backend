import { db } from "../config/db";
import { users } from "../config/db";
import { eq } from "drizzle-orm";
export const findByEmail = async (email: string) => {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1)
    return result[0] ?? null;
}
export const createUser = async (user: { id: string, email: string, name: string, profile: string }) => {
    const insertUser = await db.insert(users).values(user).returning()
    return insertUser[0]!
}