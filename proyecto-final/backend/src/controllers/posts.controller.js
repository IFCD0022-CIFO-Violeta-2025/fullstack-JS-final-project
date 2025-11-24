import db from "../models/index.js";
const Posts = db.Posts;

export const getAllPosts = async (req, res) => {
  try {
    res.json(await Posts.findAll());
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getPostById = async (req, res) => {
  try {
    const row = await Posts.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Post not found" });
    res.json(row);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const createPost = async (req, res) => {
  try {
    res.status(201).json(await Posts.create(req.body));
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const updatePost = async (req, res) => {
  try {
    const row = await Posts.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Post not found" });
    await row.update(req.body);
    res.json(row);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

// Hard delete del Post
export const hardDeletePost = async (req, res) => {
  try {
    const row = await Posts.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Post not found" });
    await row.destroy();
    res.json({ message: "Post removed (hard delete)" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

//Soft Delete
export const softDeletePost = async (req, res) => {
  try {
    const row = await Posts.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Post not found" });
    await row.update({ borrado: true, deleted_at: new Date() });
    res.json({ message: "Post deleted logically" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
