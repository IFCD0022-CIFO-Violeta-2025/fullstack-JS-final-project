import db from "../models/index.js";
const Events = db.Events;

export const getAllEvents = async (req, res) => {
  try {
    const data = await Events.findAll();
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getEventById = async (req, res) => {
  try {
    const data = await Events.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Event not found" });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const createEvent = async (req, res) => {
  try {
    console.log(req.body);
    const data = await Events.create(req.body);
    res.status(201).json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const updateEvent = async (req, res) => {
  try {
    const data = await Events.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Event not found" });
    await data.update(req.body);
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

// Hard delete del comentario
export const hardDeleteEvent = async (req, res) => {
  try {
    const row = await Events.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "FAQ not found" });
    await row.destroy();
    res.json({ message: "Event removed (hard delete)" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};


//Soft Delete
export const softDeleteEvent = async (req, res) => {
  try {
    const data = await Events.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Event not found" });

    await data.update({ deleted: true, deleted_at: new Date() });
    res.json({ message: "Event deleted logically" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
