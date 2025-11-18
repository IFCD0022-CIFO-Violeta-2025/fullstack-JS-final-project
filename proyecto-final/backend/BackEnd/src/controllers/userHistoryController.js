import UserHistory from "../models/UserHistory.js";

// Obtener un registro completo de actividades
export const listUserHistory = async (req, res) => {
  try {
    const history = await UserHistory.findAll({
      order: [["timestamp", "DESC"]],
    });
    return res.json(history);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Obtener el historial de cada un usuario.
export const getUserHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await UserHistory.findAll({
      where: { userId },
      order: [["timestamp", "DESC"]],
    });

    if (!history || history.length === 0) {
      return res
        .status(404)
        .json({ error: "No hay historial para este usuario." });
    }

    return res.json(history);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
