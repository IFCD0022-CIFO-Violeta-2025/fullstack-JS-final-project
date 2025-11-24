import { Router } from "express";
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  softDeleteLocation,
  hardDeleteLocation
} from "../controllers/locations.controller.js";

const router = Router();

router.get("/", getAllLocations);
router.get("/:id", getLocationById);
router.post("/", createLocation);
router.put("/:id", updateLocation);
router.delete("/:id", softDeleteLocation);
router.delete("/hardDelete/:id", hardDeleteLocation);

export default router;
