import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { createPost, listPosts } from "../controllers/postController.js";

const router = Router();
router.get("/", requireAuth, listPosts);
router.post("/", requireAuth, createPost);

export default router;
