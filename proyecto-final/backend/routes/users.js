import express from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const schema = Joi.object({
  nombre: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

// Registro
router.post("/registro", async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const existe = await User.findOne({ where: { email: req.body.email } });
    if (existe) return res.status(400).json({ error: "El usuario ya existe" });

    const hashed = await bcrypt.hash(req.body.password, 10);

    const usuario = await User.create({
      nombre: req.body.nombre,
      email: req.body.email,
      password: hashed,
      role: req.body.role || "user", // por defecto 'user'
    });

    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const usuario = await User.findOne({ where: { email: req.body.email } });
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    const valido = await bcrypt.compare(req.body.password, usuario.password);
    if (!valido) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, role: usuario.role  },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ mensaje: "Login exitoso", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// GET para comprobar si un usuario existe por email
router.get("/exists/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const usuario = await User.findOne({ where: { email } });

    if (usuario) {
      return res.json({ existe: true, id: usuario.id, nombre: usuario.nombre,  eliminado: !!usuario.deletedAt });
    } else {
      return res.json({ existe: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// DELETE /api/users/:id
// router.delete("/:id", authMiddleware, checkRole(["admin"]), async (req, res) => { EN PRODUCCCION
router.delete("/:id", async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    await usuario.destroy(); // con paranoid: true → soft delete
    res.json({ mensaje: "Usuario eliminado (soft delete)" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});







export default router;
