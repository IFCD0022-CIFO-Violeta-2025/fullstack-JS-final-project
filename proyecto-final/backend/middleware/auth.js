import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  // El token normalmente se envía en el header Authorization: "Bearer <token>"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Acceso denegado, token faltante" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // agregamos info del usuario al request
    next(); // seguimos al siguiente middleware o ruta
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};

export default authMiddleware;
