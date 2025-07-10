import { db } from "../config/db";
import { feedback } from "../config/db";
import { nanoid } from "nanoid"
import { format } from 'date-fns'
import {
    InferInsertModel
} from "drizzle-orm"
function formateDayInProperWay(): string {
    const data = new Date()
    return data.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
    }).replace(' ', '-')
}
export type NewfeedBack = InferInsertModel<typeof feedback>
export const createFeedback = async (message: string) => {
    const newfeedbacks: NewfeedBack = {
        id: nanoid(),
        message,
        createdAt: formateDayInProperWay(),
    }
    await db.insert(feedback).values(newfeedbacks)
    return {
        newfeedbacks
    }
}