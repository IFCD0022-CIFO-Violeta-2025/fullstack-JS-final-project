import db from "../models/index.js";
const Messages = db.Messages;

export const getAllMessages = async (req, res) => {
  try {
    res.json(await Messages.findAll());
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getMessageById = async (req, res) => {
  try {
    const row = await Messages.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Message not found" });
    res.json(row);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const createMessage = async (req, res) => {
  try {
    res.status(201).json(await Messages.create(req.body));
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const updateMessage = async (req, res) => {
  try {
    const row = await Messages.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Message not found" });
    await row.update(req.body);
    res.json(row);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

//Hard Delete
export const hardDeleteMessage = async (req, res) => {
  try {
    const row = await Messages.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Message not found" });
    await row.destroy();
    res.json({ message: "Message removed" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
