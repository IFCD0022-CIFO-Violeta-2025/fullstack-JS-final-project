import { Router } from "express";
import {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  //softDeleteProfile,
  hardDeleteProfile
} from "../controllers/profiles.controller.js";

const router = Router();

router.get("/", getAllProfiles);
router.get("/:id", getProfileById);
router.post("/", createProfile);
router.put("/:id", updateProfile);
//router.delete("/:id", softDeleteProfile); // ESTA ENTIDAD NO TIENE SOFT DELETE
router.delete("/hardDelete/:id", hardDeleteProfile);

export default router;
