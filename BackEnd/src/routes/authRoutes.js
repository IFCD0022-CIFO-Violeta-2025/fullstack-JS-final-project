/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authorization and registration
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: New user registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Incorrect data
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful login, returns a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Incorrect login or password
 */

import { Router } from "express";
import { register, login } from "../controllers/authController.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);

export default router;
