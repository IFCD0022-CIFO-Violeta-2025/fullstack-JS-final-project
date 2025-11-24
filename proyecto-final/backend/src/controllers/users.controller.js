import db from "../models/index.js";

const Users = db.Users;

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
    const data = await Users.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

export const deleteUser = async (req, res) => {
  try {
    const data = await Users.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "User not found" });

    await data.update({ deleted: true, deleted_at: new Date() });
    res.json({ message: "User deleted logically" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
