import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { createTag, listTags } from "../controllers/tagController.js";

const router = Router();
router.get("/", listTags);
router.post("/", requireAuth, createTag);

export default router;
