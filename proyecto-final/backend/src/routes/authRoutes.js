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
import { validateUser } from "../middlewares/userMiddleware.js";
import { requireAuth } from "../middlewares/authMiddleware.js"; 
import {
  register,
  login,
  refresh,
  me,
  logout,
} from "../controllers/authController.js"; 

const router = Router();

// реєстрація нового користувача
router.post("/register", validateUser, register);

// логін користувача
router.post("/login", login);

// оновлення access‑токена через refresh‑токен
router.post("/refresh", refresh);

// отримати поточного користувача (захищений маршрут)
router.get("/me", requireAuth, me);


// вихід (опціонально)
router.post("/logout", logout);

export default router;

