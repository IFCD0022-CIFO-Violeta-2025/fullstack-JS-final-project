import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { addComment } from "../controllers/commentController.js";

const router = Router();
router.post("/", requireAuth, addComment);

export default router;
