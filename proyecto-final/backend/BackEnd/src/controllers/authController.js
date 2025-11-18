import { User, Profile, UserProfile } from "../models/index.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signToken } from "../config/jwt.js";
import { registerSchema, loginSchema } from "../validations/authSchemas.js";

export const register = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, name, lastName, email, password } = value;
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
    });

    let profile = await Profile.findOne({ where: { profileName: "user" } });
    if (!profile) profile = await Profile.create({ profileName: "user" });
    await UserProfile.create({
      idUser: user.idUser,
      idProfile: profile.idProfile,
    });

    const token = signToken({ idUser: user.idUser, roleNames: ["user"] });
    return res
      .status(201)
      .json({ token, user: { idUser: user.idUser, username, email } });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};

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
    const token = signToken({ idUser: user.idUser, roleNames });

    return res.status(200).json({
      token,
      user: {
        idUser: user.idUser,
        username: user.username,
        email: user.email,
        roles: roleNames,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};
