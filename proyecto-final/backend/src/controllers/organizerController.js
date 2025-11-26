import { Organizer } from "../models/index.js";

export const createOrganizer = async (req, res) => {
  const { documentType, documentNumber, organizerName, organizerInfo } =
    req.body;
  if (!documentType || !documentNumber || !organizerName)
    return res.status(400).json({ error: "Missing required fields" });
  try {
    const org = await Organizer.create({
      documentType,
      documentNumber,
      organizerName,
      organizerInfo,
    });
    return res.status(201).json(org);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const listOrganizers = async (_req, res) => {
  try {
    const orgs = await Organizer.findAll();
    return res.json(orgs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
