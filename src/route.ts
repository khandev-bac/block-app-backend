import { Hono } from "hono";
import { Createfeedback, login, test } from "./controller";
const router = new Hono()
router.post("/google", login)
router.get("/test", test)
router.post("/feedback", Createfeedback)
export default router;