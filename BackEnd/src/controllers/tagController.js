import { Tag } from "../models/index.js";
import { tagSchema } from "../validations/tagSchemas.js";

export const createTag = async (req, res) => {
  const { error, value } = tagSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const tag = await Tag.create(value);
    return res.status(201).json(tag);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const listTags = async (_req, res) => {
  try {
    const tags = await Tag.findAll();
    return res.json(tags);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
