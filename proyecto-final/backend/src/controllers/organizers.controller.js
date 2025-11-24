import db from "../models/index.js";
const Organizers = db.Organizers;

export const getAllOrganizers = async (req, res) => {
  try {
    res.json(await Organizers.findAll());
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getOrganizerById = async (req, res) => {
  try {
    const org = await Organizers.findByPk(req.params.id);
    if (!org) return res.status(404).json({ error: "Organizer not found" });
    res.json(org);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const createOrganizer = async (req, res) => {
  try {
    res.status(201).json(await Organizers.create(req.body));
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const updateOrganizer = async (req, res) => {
  try {
    const org = await Organizers.findByPk(req.params.id);
    if (!org) return res.status(404).json({ error: "Organizer not found" });
    await org.update(req.body);
    res.json(org);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

//Hard Delete
export const hardDeleteOrganizer = async (req, res) => {
  try {
    const org = await Organizers.findByPk(req.params.id);
    if (!org) return res.status(404).json({ error: "Organizer not found" });
    await org.destroy();
    res.json({ message: "Organizer removed" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
