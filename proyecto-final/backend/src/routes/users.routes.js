import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  softDeleteUser,
  hardDeleteUser
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", softDeleteUser);
router.delete("/hardDelete/:id", hardDeleteUser);

export default router;
