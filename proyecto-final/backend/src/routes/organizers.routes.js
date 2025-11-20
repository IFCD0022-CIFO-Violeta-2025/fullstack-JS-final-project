import { Router } from "express";
import {
  getAllOrganizers,
  getOrganizerById,
  createOrganizer,
  updateOrganizer,
  deleteOrganizer
} from "../controllers/organizers.controller.js";

const router = Router();

router.get("/", getAllOrganizers);
router.get("/:id", getOrganizerById);
router.post("/", createOrganizer);
router.put("/:id", updateOrganizer);
router.delete("/:id", deleteOrganizer);

export default router;
