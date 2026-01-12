import express from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import dotenv from "dotenv";
import { v4 } from "uuid";
import token from '../common/tokens.controller.js'
import { sendConfirmationLink} from '../common/email.controller.js'

const Users = db.Users;
const router = express.Router();

dotenv.config();

const schema = Joi.object({
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

export const loginUser = async (req, res) => {
   try {
    const userEmail = req.body.username.includes('@') ? req.body.username : null
    const userUsername = !userEmail ? req.body.username : null
    let usuario = null;

    if (!userEmail && !userUsername) {
      return res.status(400).json({ error: "Se requiere email o username", code: "VALIDATION_ERROR" });
    }

    if (userEmail) {
      req.body.email = userEmail
      usuario = await Users.findOne({ where: { email: req.body.email } });
    } else {
      usuario = await Users.findOne({ where: { username: userUsername } });
    }

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado", code: "USER_NOT_FOUND" });
    } 

    const passwordMatch = await bcrypt.compare(req.body.password, usuario.clave);
    if (!passwordMatch)
      return res.status(401).json({ error: "Contraseña incorrecta", code: "INVALID_CREDENTIALS" });

    const jwtSecret = process.env.JWT_SECRET || "default_secret";
      if (!jwtSecret) {
        return res.status(500).json({ error: "JWT secret missing" });
      }


    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, role: usuario.role  },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.json({ mensaje: "Login exitoso",username: usuario.username, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, code: "SERVER_ERROR" });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const data = await Users.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const data = await Users.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "User not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
   try {
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({
        error: error.details[0].message,
        code: "VALIDATION_ERROR",
        details: error.details,
      });

    const existeEmail = await Users.findOne({ where: { email: req.body.email } });
    if (existeEmail)
      return res.status(409).json({ error: "Email ya registrado", code: "EMAIL_TAKEN" });

    const existe = await Users.findOne({ where: { username: req.body.username } });
    if (existe)
      return res.status(409).json({ error: "Username ya registrado", code: "USERNAME_TAKEN" });

    const hashed = await bcrypt.hash(req.body.password, 10);

    const email_token = token(36);

    const usuario = await Users.create({
      UUID: v4(),
      username: req.body.username,
      email: req.body.email,
      clave: hashed,
      role: req.body.role || "user", // por defecto 'user'
      confirmation_token: email_token,
      confirmation_ok: false
    });

    sendConfirmationLink({
      to: req.body.email,
    },token)

    res.status(201).json({
      username: usuario.username,
      email: usuario.email,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, code: "SERVER_ERROR" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = await Users.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "User not found" });

    await data.update(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hard delete del User
export const hardDeleteUser = async (req, res) => {
  try {
    const row = await Users.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "User not found" });
    await row.destroy();
    res.json({ message: "User removed (hard delete)" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};


//Soft Delete
export const softDeleteUser = async (req, res) => {
  try {
    const data = await Users.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "User not found" });

    await data.update({ deleted: true, deleted_at: new Date() });
    res.json({ message: "User deleted logically" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Confirm User
//Link de Confirmacion de que un usuario ha recibido el token
export const confirmTokenUser  = async (req, res) => {
  try {
    const data = await Users.findOne({where: { email: req.query.email } });
    if (!data) return res.status(404).json({ error: "User not found" });

    if (data.token !== data.confirmation_token) res.status(404).json({ error: "User not valid" });

    await data.update({ confirmation_ok: true, confirmation_token: '' });
    res.json({ message: "New user confirmed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// QUE PINTA ESTO AQUI????
// GET para comprobar si un usuario existe por email
router.get("/exists/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const usuario = await Users.findOne({ where: { email } });

    if (usuario) {
      return res.json({ existe: true, id: usuario.id, nombre: usuario.nombre,  eliminado: !!usuario.deletedAt });
    } else {
      return res.json({ existe: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});