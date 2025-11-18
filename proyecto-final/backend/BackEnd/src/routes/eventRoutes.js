/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Gestión de eventos
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Obtener una lista de todos los eventos
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Lista eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *               examples:
 *               sample:
 *                 summary: Example of events for the calendar
 *                 value:
 *                   - idEvent: 1
 *                     title: "React Conference"
 *                     description: "Online meeting for developers"
 *                     starttime: "2025-11-20T10:00:00Z"
 *                     endtime: "2025-11-20T18:00:00Z"
 *                   - idEvent: 2
 *                     title: "Music Festival"
 *                     description: "Music festival"
 *                     starttime: "2025-11-25T15:00:00Z"
 *                     endtime: "2025-11-25T23:00:00Z"
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Obtener evento por ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un evento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Evento no encontrado
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Crear nuevo evento
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Evento ha creado
 *       400:
 *         description: Datos incorrectos
 */

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Actualizar evento
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Evento ha actualizado
 *       404:
 *         description: Evento no encontrado
 */

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Eliminar evento
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento ha eliminado
 *       404:
 *         description: Evento no encontrado
 */

import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { getNearbyEvents } from "../controllers/eventController.js";
import {
  createEvent,
  listEvents,
  addTagToEvent,
  subscribeEvent,
} from "../controllers/eventController.js";

const router = Router();
router.get("/", listEvents);
router.post("/", requireAuth, createEvent);
router.post("/tags", requireAuth, addTagToEvent);
router.post("/:id/subscribe", requireAuth, subscribeEvent);
router.get("/nearby", /* requireAuth, */ getNearbyEvents);

export default router;
