import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import {
  createOrganizer,
  listOrganizers,
} from "../controllers/organizerController.js";

const router = Router();
router.get("/", listOrganizers);
router.post("/", requireAuth, createOrganizer);

export default router;
