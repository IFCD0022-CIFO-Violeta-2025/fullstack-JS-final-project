import db from "../models/index.js";
const FAQs = db.FAQs;

export const getAllFAQs = async (req, res) => {
  try {
    res.json(await FAQs.findAll());
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getFAQById = async (req, res) => {
  try {
    const row = await FAQs.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "FAQ not found" });
    res.json(row);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const createFAQ = async (req, res) => {
  try {
    res.status(201).json(await FAQs.create(req.body));
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const updateFAQ = async (req, res) => {
  try {
    const row = await FAQs.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "FAQ not found" });
    await row.update(req.body);
    res.json(row);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

//Hard Delete
export const hardDeleteFAQ = async (req, res) => {
  try {
    const row = await FAQs.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "FAQ not found" });
    await row.destroy();
    res.json({ message: "FAQ removed" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
