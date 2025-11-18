/**
 * @swagger
 * /user-history:
 *   get:
 *     summary: Obtener un registro completo de las acciones del usuario
 *     tags: [UserHistory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de entradas históricas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserHistory'
 *             examples:
 *               sample:
 *                 summary: Ejemplo de un diario
 *                 value:
 *                   - idHistory: 1
 *                     userId: 42
 *                     action: "blocked"
 *                     performedBy: 7
 *                     snapshot:
 *                       idUser: 42
 *                       username: "badUser"
 *                       email: "bad@example.com"
 *                       banned: true
 *                     timestamp: "2025-11-16T09:30:00Z"
 *                   - idHistory: 2
 *                     userId: 42
 *                     action: "deleted"
 *                     performedBy: 7
 *                     snapshot:
 *                       idUser: 42
 *                       username: "badUser"
 *                       email: "bad@example.com"
 *                       banned: true
 *                       deletedAt: "2025-11-16T09:45:00Z"
 *                     timestamp: "2025-11-16T09:45:00Z"
 */

/**
 * @swagger
 * /user-history/{userId}:
 *   get:
 *     summary: Obtener el historial de acciones de un usuario específico
 *     tags: [UserHistory]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historial de acciones del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserHistory'
 *             examples:
 *               sample:
 *                 summary: Ejemplo de una historia de usuario
 *                 value:
 *                   - idHistory: 1
 *                     userId: 42
 *                     action: "blocked"
 *                     performedBy: 7
 *                     snapshot:
 *                       idUser: 42
 *                       username: "badUser"
 *                       banned: true
 *                     timestamp: "2025-11-16T09:30:00Z"
 */

import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import {
  listUserHistory,
  getUserHistory,
} from "../controllers/userHistoryController.js";

const router = Router();

// Obtener registro completo (solo administrador)
router.get("/", requireAuth, requireRole("admin"), listUserHistory);

// Obtener el historial de un usuario específico (solo administrador)
router.get("/:userId", requireAuth, requireRole("admin"), getUserHistory);

export default router;
