import { User, Profile } from "../models/index.js";
import { verifyAccessToken } from "../config/jwt.js";

// ---------------------------------------------------
//   GET /me — get current user data
// ---------------------------------------------------
export const me = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    const user = await User.findByPk(decoded.idUser, {
      attributes: [
        "idUser",
        "username",
        "email",
        "name",
        "lastName",
        "documentType",
        "documentNumber",
      ],
      include: {
        model: Profile,
        attributes: ["idProfile", "profileName"],
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// ---------------------------------------------------
//   PUT /me — оновити профіль користувача
// ---------------------------------------------------
export const meUpdate = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = verifyAccessToken(token);

    const user = await User.findByPk(decoded.idUser, {
      include: Profile,
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    // allowed fields
    const allowedFields = [
      "username",
      "email",
      "name",
      "lastName",
      "documentType",
      "documentNumber",
    ];

    const updateData = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    }

    await user.update(updateData);

    // оновлення профілю
    if (req.body.profileName && user.Profile) {
      await user.Profile.update({ profileName: req.body.profileName });
    }

    // IMPORTANT: we return the same fields as me
    const updatedUser = await User.findByPk(decoded.idUser, {
      attributes: [
        "idUser",
        "username",
        "email",
        "name",
        "lastName",
        "documentType",
        "documentNumber",
      ],
      include: {
        model: Profile,
        attributes: ["idProfile", "profileName"],
      },
    });

    return res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ---------------------------------------------------
//   DELETE /me — delete account
// ---------------------------------------------------
export const meDelete = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = verifyAccessToken(token);

    const user = await User.findByPk(decoded.idUser, { include: Profile });

    if (!user) return res.status(404).json({ error: "User not found" });

    // Deleting the profile completely
    if (user.Profile) await user.Profile.destroy({ force: true });

    // Deleting a user completely
    await user.destroy({ force: true });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};