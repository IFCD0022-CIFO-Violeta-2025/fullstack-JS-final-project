// controllers/userController.js

import { User, Profile } from "../models/index.js";
import { hashPassword } from "../utils/password.js";
import { userSchema } from "../validations/userSchemas.js";

// 1. Отримати список всіх користувачів
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

// 2. Отримати одного користувача
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

// 3. Оновити користувача (profile + user)
export const updateUser = async (req, res) => {
  // Валідація
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const user = await User.findByPk(req.params.id, { include: Profile });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Якщо хочуть змінити пароль
    if (value.password) {
      value.password = await hashPassword(value.password);
    }

    // Оновлюємо таблицю Users
    await user.update(value);

    // Оновлюємо таблицю Profiles (тільки якщо поля існують)
    if (user.Profile) {
      await user.Profile.update({
        address: value.address ?? user.Profile.address,
        aboutMe: value.aboutMe ?? user.Profile.aboutMe,
      });
    }

    // Отримуємо повний оновлений user без password
    const updatedUser = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: Profile,
    });

    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 4. Видалити користувача (включно з профілем)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Profile });

    if (!user) return res.status(404).json({ error: "User not found" });

    // Видаляємо профіль, якщо він є
    if (user.Profile) {
      await user.Profile.destroy();
    }

    // Видаляємо користувача
    await user.destroy();

    return res.json({ message: "User deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 5. Заблокувати користувача
export const blockUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.banned = true;
    await user.save();

    return res.json({
      message: "User blocked",
      user: {
        idUser: user.idUser,
        username: user.username,
        banned: user.banned,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: "Помилка при блокуванні" });
  }
};
