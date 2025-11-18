import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import {
  listNotifications,
  markRead,
} from "../controllers/notificationController.js";

const router = Router();
router.get("/", requireAuth, listNotifications);
router.put("/:id/read", requireAuth, markRead);

export default router;
