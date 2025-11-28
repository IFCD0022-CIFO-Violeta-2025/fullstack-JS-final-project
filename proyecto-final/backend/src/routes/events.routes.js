import { Router } from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  softDeleteEvent,
  hardDeleteEvent
} from "../controllers/events.controller.js";

const router = Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", softDeleteEvent);
router.delete("/hardDelete/:id", hardDeleteEvent);

export default router;
