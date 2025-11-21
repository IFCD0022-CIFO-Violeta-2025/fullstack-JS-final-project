import { Router } from "express";
import {
  getAllPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  hardDeletePermission
  //softDeletePermission
} from "../controllers/permissions.controller.js";

const router = Router();

router.get("/", getAllPermissions);
router.get("/:id", getPermissionById);
router.post("/", createPermission);
router.put("/:id", updatePermission);
//router.delete("/:id", softDeletePermission); // EN ESTA ENTIDAD NO HAY SOFT DELETE
router.delete("/hardDelete/:id", hardDeletePermission);

export default router;
