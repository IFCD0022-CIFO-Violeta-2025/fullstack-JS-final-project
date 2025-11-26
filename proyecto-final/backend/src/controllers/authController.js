import { User, Profile, UserProfile } from "../models/index.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken, // додано
} from "../config/jwt.js";
import { registerSchema, loginSchema } from "../validations/authSchemas.js";

// ---------------- REGISTER ----------------
export const register = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    username,
    name,
    lastName,
    email,
    password,
    documentType,
    documentNumber,
  } = value;

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists)
      return res.status(409).json({ error: "Email already registered" });

    const pwdHash = await hashPassword(password);
    const user = await User.create({
      username,
      name,
      lastName,
      email,
      password: pwdHash,
      documentType,
      documentNumber,
    });

    // призначаємо роль "user" за замовчуванням
    let profile = await Profile.findOne({ where: { profileName: "user" } });
    if (!profile) profile = await Profile.create({ profileName: "user" });

    await UserProfile.create({
      idUser: user.idUser,
      idProfile: profile.idProfile,
    });

    const accessToken = signAccessToken({
      idUser: user.idUser,
      roleNames: ["user"],
    });
    const refreshToken = signRefreshToken({
      idUser: user.idUser,
      roleNames: ["user"],
    });

    return res.status(201).json({
      accessToken,
      refreshToken,
      user: { idUser: user.idUser, username, email },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = value;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const profiles = await user.getProfiles();
    const roleNames = profiles.map((p) => p.profileName);

    const accessToken = signAccessToken({ idUser: user.idUser, roleNames });
    const refreshToken = signRefreshToken({ idUser: user.idUser, roleNames });

    return res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        idUser: user.idUser,
        username: user.username,
        email: user.email,
        roles: roleNames,
        documentType: user.documentType,
        documentNumber: user.documentNumber,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};

// ---------------- REFRESH ----------------
export const refresh = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  try {
    const user = verifyRefreshToken(refreshToken);
    const newAccessToken = signAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

// ---------------- ME ----------------
export const me = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
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
    });
 
 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      idUser: user.idUser,
      username: user.username,
      email: user.email,
      documentType: user.documentType,
      documentNumber: user.documentNumber,
      roles: decoded.roleNames,
    });
       
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// ---------------- LOGOUT ----------------
export const logout = (req, res) => {
  // простий варіант: фронтенд сам очищає localStorage
  res.json({ message: "Logged out" });
};