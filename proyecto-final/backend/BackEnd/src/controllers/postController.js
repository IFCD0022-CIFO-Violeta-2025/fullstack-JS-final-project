import { Post, User, Comment } from "../models/index.js";
import { postSchema } from "../validations/postSchemas.js";

export const createPost = async (req, res) => {
  const { error, value } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const post = await Post.create({ ...value, idUser: req.user.idUser });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const listPosts = async (_req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ["idUser", "username"] },
        { model: Comment, attributes: ["idComment", "content"] },
      ],
      order: [["idPost", "DESC"]],
    });
    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
