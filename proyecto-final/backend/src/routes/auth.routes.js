import { Router } from "express";
import { validateUser } from "../middlewares/userMiddleware.js";
import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/authController.js"; 

const router = Router();

// new user registration
router.post("/register", validateUser, register);

// user login
router.post("/login", login);

// updating the access token via refresh token
router.post("/refresh", refresh);

// logout
router.post("/logout", logout);

export default router;
