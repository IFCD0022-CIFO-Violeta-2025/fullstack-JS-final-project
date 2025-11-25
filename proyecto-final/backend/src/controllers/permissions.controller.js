import db from "../models/index.js";
const Permissions = db.Permissions;

export const getAllPermissions = async (req, res) => {
  try {
    res.json(await Permissions.findAll());
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getPermissionById = async (req, res) => {
  try {
    const row = await Permissions.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Permission not found" });
    res.json(row);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const createPermission = async (req, res) => {
  try {
    res.status(201).json(await Permissions.create(req.body));
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const updatePermission = async (req, res) => {
  try {
    const row = await Permissions.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Permission not found" });
    await row.update(req.body);
    res.json(row);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

//HardDelete
export const hardDeletePermission = async (req, res) => {
  try {
    const row = await Permissions.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Permission not found" });
    await row.destroy();
    res.json({ message: "Permission removed" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
