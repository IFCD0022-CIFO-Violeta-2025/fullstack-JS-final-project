import { Comment } from "../models/index.js";
import { commentSchema } from "../validations/commentSchemas.js";

export const addComment = async (req, res) => {
  const { error, value } = commentSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const c = await Comment.create({ ...value, idUser: req.user.idUser });
    return res.status(201).json(c);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
