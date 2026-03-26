import { Message, User } from "../models/index.js";

export const sendMessage = async (req, res) => {
  const { idReceiver, content } = req.body;
  if (!idReceiver || !content)
    return res.status(400).json({ error: "idReceiver and content required" });
  try {
    const msg = await Message.create({
      idSender: req.user.idUser,
      idReceiver,
      content,
    });
    return res.status(201).json(msg);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const inbox = async (req, res) => {
  try {
    const msgs = await Message.findAll({
      where: { idReceiver: req.user.idUser },
      include: [
        { model: User, as: "sender", attributes: ["idUser", "username"] },
      ],
    });
    return res.json(msgs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
