import { Router } from "express";
import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  hardDeleteComment,
  softDeleteComment
} from "../controllers/comments.controller.js";

const router = Router();

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", softDeleteComment);
router.delete("/hardDelete/:id", hardDeleteComment);


export default router;
