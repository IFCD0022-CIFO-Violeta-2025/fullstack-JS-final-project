import { Router } from "express";
import {
  getAllOrganizers,
  getOrganizerById,
  createOrganizer,
  updateOrganizer,
  //softDeleteOrganizer,
  hardDeleteOrganizer
} from "../controllers/organizers.controller.js";

const router = Router();

router.get("/", getAllOrganizers);
router.get("/:id", getOrganizerById);
router.post("/", createOrganizer);
router.put("/:id", updateOrganizer);
//router.delete("/:id", softDeleteOrganizer); //EN ESTA ENTIDAD NO HAY SOFT DELETE
router.delete("/hardDelete/:id", hardDeleteOrganizer);

export default router;
