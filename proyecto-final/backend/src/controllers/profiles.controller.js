import db from "../models/index.js";
const Profiles = db.Profiles;

export const getAllProfiles = async (req, res) => {
  try {
    res.json(await Profiles.findAll());
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getProfileById = async (req, res) => {
  try {
    const row = await Profiles.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Profile not found" });
    res.json(row);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const createProfile = async (req, res) => {
  try {
    res.status(201).json(await Profiles.create(req.body));
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const updateProfile = async (req, res) => {
  try {
    const row = await Profiles.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Profile not found" });
    await row.update(req.body);
    res.json(row);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

//Hard Delete
export const hardDeleteProfile = async (req, res) => {
  try {
    const row = await Profiles.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Profile not found" });
    await row.destroy();
    res.json({ message: "Profile removed" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
