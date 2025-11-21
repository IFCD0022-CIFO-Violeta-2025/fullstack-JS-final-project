import express from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const schema = Joi.object({
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

// Registro
router.post("/register", async (req, res) => {
  console.log(req.body)
  try {
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({
        error: error.details[0].message,
        code: "VALIDATION_ERROR",
        details: error.details,
      });

    const existeEmail = await User.findOne({ where: { email: req.body.email } });
    if (existeEmail)
      return res.status(409).json({ error: "Email ya registrado", code: "EMAIL_TAKEN" });

    const existe = await User.findOne({ where: { username: req.body.username } });
    if (existe)
      return res.status(409).json({ error: "Username ya registrado", code: "USERNAME_TAKEN" });

    const hashed = await bcrypt.hash(req.body.password, 10);

    const usuario = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
      role: req.body.role || "user", // por defecto 'user'
    });
    res.status(201).json({
      id: usuario.idUser || usuario.id,
      username: usuario.username,
      email: usuario.email,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, code: "SERVER_ERROR" });
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log('Llega a Login')
  try {
    const userEmail = req.body.username.includes('@') ? req.body.username : null
    const userUsername = !userEmail ? req.body.username : null

    if (!userEmail && !userUsername) {
      return res.status(400).json({ error: "Se requiere email o username", code: "VALIDATION_ERROR" });
    }

    if (userEmail) {
      req.body.email = userEmail
    } else {
      const usuarioByUsername = await User.findOne({ where: { username: userUsername } });
      if (!usuarioByUsername) {
        return res.status(404).json({ error: "Usuario no encontrado", code: "USER_NOT_FOUND" });
      } else {
        req.body.email = usuarioByUsername.email
      }
    }
    
    const usuario = await User.findOne({ where: { email: req.body.email } });
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado", code: "USER_NOT_FOUND" });

    const valido = await bcrypt.compare(req.body.password, usuario.password);
    if (!valido)
      return res.status(401).json({ error: "Contraseña incorrecta", code: "INVALID_CREDENTIALS" });

    const jwtSecret = process.env.JWT_SECRET || process.env.AWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT secret not configured (process.env.JWT_SECRET or process.env.AWT_SECRET)');
      return res.status(500).json({ error: 'Server misconfiguration: JWT secret missing', code: 'SERVER_CONFIG' });
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, role: usuario.role  },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.json({ mensaje: "Login exitoso",username: userUsername, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, code: "SERVER_ERROR" });
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
