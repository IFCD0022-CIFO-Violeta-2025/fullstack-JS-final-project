import { User, Profile } from "../models/index.js";
import { hashPassword } from "../utils/password.js";
import { userSchema } from "../validations/userSchemas.js";

// Get a list of all users (Отримати список усіх користувачів)
export const listUsers = async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: Profile,
    });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get one user by id (Отримати одного користувача за id)
export const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: Profile,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update user (Оновити користувача)
export const updateUser = async (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (value.password) {
      value.password = await hashPassword(value.password);
    }

    await user.update(value);
    return res.json({ message: "User updated", user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete user (Видалити користувача)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.destroy();
    return res.json({ message: "User deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Заблокувати користувача
export const blockUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Actualizamos el estado del usuario a "banned"
    await user.update({ estado: "banned" });

    return res.json({ message: "User blocked", user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
