import { Router } from "express";
import {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  //softDeleteTag,
  hardDeleteTag
} from "../controllers/tags.controller.js";

const router = Router();

router.get("/", getAllTags);
router.get("/:id", getTagById);
router.post("/", createTag);
router.put("/:id", updateTag);
//router.delete("/:id", softDeleteTag); //ESTA ENTIDAD NO IMPLEMENTA SOFT DELETE
router.delete("/hardDelete/:id", hardDeleteTag);

export default router;
