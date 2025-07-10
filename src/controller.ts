import { Context } from "hono";
import { verifyGoogleToken } from "./utils/verifyToken";
import { createUser, findByEmail } from "./repo/user";
import { createFeedback } from "./repo/feedback";
export const test = async (c: Context) => {
    return c.json({ message: "test" })
}
export const login = async (c: Context) => {
    const { idToken } = await c.req.json();
    if (!idToken) return c.json({ error: 'Missing ID token' }, 400)
    try {
        const google = await verifyGoogleToken(idToken)
        let user = await findByEmail(google.email)
        if (!user) {
            user = await createUser(google) // NewUser type — no `createAt` needed
        }
        return c.json({ user, message: 'Login successful' })
    } catch (error) {
        return c.json({ error: 'Invalid Google token' }, 401)
    }
}
export const Createfeedback = async (c: Context) => {
    const { message } = await c.req.json()

    if (!message || message.trim().length < 3) {
        return c.json({ error: 'Feedback message is too short' }, 400)
    }
    try {
        const fb = await createFeedback(message)
        return c.json({ message: 'Thank you for your feedback!', fb })
    } catch (error) {
        return c.json({ message: "Failed to send feedbacks try later", error: error })
    }
}