import db from "../models/index.js";
const Notifications = db.Notifications;

export const getAllNotifications = async (req, res) => {
  try {
    res.json(await Notifications.findAll());
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getNotificationById = async (req, res) => {
  try {
    const n = await Notifications.findByPk(req.params.id);
    if (!n) return res.status(404).json({ error: "Notification not found" });
    res.json(n);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const createNotification = async (req, res) => {
  try {
    res.status(201).json(await Notifications.create(req.body));
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const updateNotification = async (req, res) => {
  try {
    const n = await Notifications.findByPk(req.params.id);
    if (!n) return res.status(404).json({ error: "Notification not found" });
    await n.update(req.body);
    res.json(n);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const hardDeleteNotification = async (req, res) => {
  try {
    const n = await Notifications.findByPk(req.params.id);
    if (!n) return res.status(404).json({ error: "Notification not found" });

    await n.destroy();
    res.json({ message: "Notification removed" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
