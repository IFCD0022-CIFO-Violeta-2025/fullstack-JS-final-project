import { verifyAccessToken } from "../config/jwt.js";

export const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload; // додаємо дані користувача у req
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// опціонально: перевірка ролей
export const requireRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const hasRole = req.user.roleNames?.some((r) => roles.includes(r));
    if (!hasRole) {
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    }
    next();
  };
};
