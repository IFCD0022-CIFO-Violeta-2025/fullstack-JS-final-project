/**
 * @swagger
 * /stats/events:
 *   get:
 *     summary: Event popularity by number of participants (admin)
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idEvent: { type: integer }
 *                   title: { type: string }
 *                   participants: { type: integer }
 *             examples:
 *               sample:
 *                 value:
 *                   - { idEvent: 1, title: "React Meetup", participants: 87 }
 *                   - { idEvent: 5, title: "Music Fest", participants: 64 }
 */

/**
 * @swagger
 * /stats/participation:
 *   get:
 *     summary: User activity (top by number of participations, admin)
 *     tags: [Stats]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *         description: Number of entries in the top
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top active users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId: { type: integer }
 *                   eventsJoined: { type: integer }
 *             examples:
 *               sample:
 *                 value:
 *                   - { userId: 42, eventsJoined: 15 }
 *                   - { userId: 7, eventsJoined: 11 }
 */

import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import {
  getUserStats,
  getEventStats,
  getParticipationStats,
} from "../controllers/statsController.js";

const router = Router();

// Admin sees everything
router.get("/users", requireAuth, requireRole("admin"), getUserStats);
router.get("/events", requireAuth, requireRole("admin"), getEventStats);
router.get(
  "/participation",
  requireAuth,
  requireRole("admin"),
  getParticipationStats
);

// Moderator — event statistics only
router.get("/events/mod", requireAuth, requireRole("moderator"), getEventStats);

export default router;
