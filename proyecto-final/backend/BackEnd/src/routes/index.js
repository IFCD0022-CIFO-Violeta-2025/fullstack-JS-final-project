import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import eventRoutes from "./eventRoutes.js";
import tagRoutes from "./tagRoutes.js";
import postRoutes from "./postRoutes.js";
import commentRoutes from "./commentRoutes.js";
import messageRoutes from "./messageRoutes.js";
import notificationRoutes from "./notificationRoutes.js";
import organizerRoutes from "./organizerRoutes.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/tags", tagRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/messages", messageRoutes);
router.use("/notifications", notificationRoutes);
router.use("/organizers", organizerRoutes);

export default router;
