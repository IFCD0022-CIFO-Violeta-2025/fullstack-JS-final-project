import db from "../models/index.js";
const Tags = db.Tags;

export const getAllTags = async (req, res) => {
  try {
    res.json(await Tags.findAll());
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getTagById = async (req, res) => {
  try {
    const row = await Tags.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Tag not found" });
    res.json(row);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const createTag = async (req, res) => {
  try {
    const row = await Tags.create(req.body);
    res.status(201).json(row);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const updateTag = async (req, res) => {
  try {
    const row = await Tags.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Tag not found" });
    await row.update(req.body);
    res.json(row);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

//Hard Delete
export const hardDeleteTag = async (req, res) => {
  try {
    const row = await Tags.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Tag not found" });
    await row.destroy();
    res.json({ message: "Tag removed" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
