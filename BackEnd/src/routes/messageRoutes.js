import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { sendMessage, inbox } from "../controllers/messageController.js";

const router = Router();
router.post("/", requireAuth, sendMessage);
router.get("/inbox", requireAuth, inbox);

export default router;
