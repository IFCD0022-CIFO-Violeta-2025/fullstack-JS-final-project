import { Notification } from "../models/index.js";

export const listNotifications = async (req, res) => {
  try {
    const notes = await Notification.findAll({
      where: { userId: req.user.idUser },
    });
    return res.json(notes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const markRead = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Notification.findByPk(id);
    if (!note || note.user_id !== req.user.idUser)
      return res.status(404).json({ error: "Not found" });
    await note.update({ is_read: true });
    return res.json(note);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
