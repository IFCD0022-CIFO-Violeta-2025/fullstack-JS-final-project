import UserHistory from "../models/UserHistory.js";
import User from "../models/User.js";
import { logUserAction } from "../middlewares/userHistoryMiddleware.js";

export const logUserAction = async (userId, action, performedBy) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) return;

    await UserHistory.create({
      userId,
      action,
      performedBy,
      snapshot: user.toJSON(),
    });
  } catch (err) {
    console.error("History logging error:", err.message);
  }
};
// User blocking
export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.idUser; // who blocks

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.banned = true;
    await user.save();

    await logUserAction(user.idUser, "blocked", adminId);

    return res.json({ message: "User blocked" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Deleting a user(soft delete)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.idUser;

    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ error: "User not found" });

    user.deletedAt = new Date();
    await user.save();

    await logUserAction(user.idUser, "deleted", adminId);

    return res.json({ message: "User deleted (soft delete)" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
