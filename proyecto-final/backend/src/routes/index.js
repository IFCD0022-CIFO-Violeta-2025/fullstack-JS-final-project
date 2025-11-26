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
import eventParticipantRoutes from "./eventParticipantRoutes.js";
import userHistoryRoutes from "./userHistoryRoutes.js";
import eventHistoryRoutes from "./eventHistoryRoutes.js";
import statsRoutes from "./statsRoutes.js";
import faqRouter from "./faqRouter.js";


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
router.use("/eventParticipant", eventParticipantRoutes);
router.use("/userHistory", userHistoryRoutes);
router.use("/stats", statsRoutes);
router.use("/eventHistory", eventHistoryRoutes);
router.use("/faq", faqRouter);


export default router;
