import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";

import {
  getAllParticipants,
  getParticipantsByEvent,
  addParticipant,
  removeParticipant
} from "../controllers/eventParticipantController.js";

const router = Router();

// Rutas CRUD
router.get("/", requireAuth, getAllParticipants);                 // GET /eventParticipants
router.get("/event/:eventId", requireAuth, getParticipantsByEvent); // GET /eventParticipants/event/:eventId
router.post("/", requireAuth, addParticipant);                   // POST /eventParticipants
router.delete("/:id", requireAuth, removeParticipant);           // DELETE /eventParticipants/:id

export default router;
