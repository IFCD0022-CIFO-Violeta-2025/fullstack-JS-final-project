/**
 * @swagger
 * tags:
 *   name: EventHistory
 *   description: Event log
 */

/**
 * @swagger
 * /event-history:
 *   get:
 *     summary: Get a complete log of events
 *     tags: [EventHistory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of history entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventHistory'
 */

/**
 * @swagger
 * /event-history/{eventId}:
 *   get:
 *     summary: Get action history for a specific event
 *     tags: [EventHistory]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Event action history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventHistory'
 *       404:
 *         description: History missing
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EventHistory:
 *       type: object
 *       properties:
 *         idHistory: { type: integer }
 *         eventId: { type: integer }
 *         action: { type: string }
 *         performedBy: { type: integer }
 *         snapshot: { type: object }
 *         timestamp: { type: string, format: date-time }
 *       example:
 *         idHistory: 1
 *         eventId: 10
 *         action: "updated"
 *         performedBy: 7
 *         snapshot:
 *           idEvent: 10
 *           title: "React Meetup"
 *           starttime: "2025-11-20T18:00:00Z"
 *           endtime: "2025-11-20T20:00:00Z"
 *         timestamp: "2025-11-16T09:30:00Z"
 */

import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import {
  listEventHistory,
  getEventHistory,
} from "../controllers/eventHistoryController.js";

const router = Router();

// Full log (admin)
router.get("/", requireAuth, requireRole("admin"), listEventHistory);

// History of a specific event (admin/moderator)
router.get(
  "/:eventId",
  requireAuth,
  requireRole("admin", "moderator"),
  getEventHistory
);

export default router;
