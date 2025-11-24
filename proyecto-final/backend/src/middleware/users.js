import express from "express";
import authMiddleware from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import User from "../models/User.js";

const router = express.Router();

// Ruta solo para admins
router.get("/admin/dashboard", authMiddleware, checkRole(["admin"]), (req, res) => {
  res.json({ mensaje: "Bienvenido admin" });
});

// Ruta para usuarios y admins
router.get("/profile", authMiddleware, checkRole(["user", "admin"]), async (req, res) => {
  const usuario = await User.findByPk(req.user.id, {
    attributes: ["id", "nombre", "email", "role"],
  });
  res.json(usuario);
});

export default router;
