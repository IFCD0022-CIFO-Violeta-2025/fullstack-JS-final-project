/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener una lista de todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario ha creado
 *       400:
 *         description: Datos incorrectos
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario ha actualizado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario ha eliminado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /users/{id}/block:
 *   put:
 *     summary: Usuario bloqueado
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario bloqueado
 *       404:
 *         description: Usuario no encontrado
 *       403:
 *         description: Acceso denegado (solo permite al administrador)
 */


import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

import {
  blockUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

// Admin can see everyone (Адмін може бачити всіх)
router.get("/", requireAuth, requireRole("admin"), listUsers);

// User can see themselves, admin can see anyone (Користувач може бачити себе, адмін — будь-кого)
router.get("/:id", requireAuth, getUser);

// Update (user or admin) (Оновлення (сам користувач або адмін))
router.put("/:id", requireAuth, updateUser);

// Delete (admin only) (Видалення (тільки адмін))
router.delete("/:id", requireAuth, requireRole("admin"), deleteUser);

//User blocking (admin only)
router.put("/:id/block", requireAuth, requireRole("admin"), blockUser);

export default router;
