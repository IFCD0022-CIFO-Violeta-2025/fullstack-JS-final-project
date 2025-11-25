import { Router } from "express";
import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  //softDeleteNotification,
  hardDeleteNotification,
} from "../controllers/notifications.controller.js";

const router = Router();

router.get("/", getAllNotifications);
router.get("/:id", getNotificationById);
router.post("/", createNotification);
router.put("/:id", updateNotification);
//router.delete("/:id", softDeleteNotification); // EN ESTA ENTIDAD NO HAY SOFT DELETE
router.delete("/hardDelete/:id", hardDeleteNotification);

export default router;
