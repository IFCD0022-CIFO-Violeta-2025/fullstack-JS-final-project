import jwt from "jsonwebtoken";

// Access token
export const signAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "2h", // короткий час життя
  });
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.error("JWT VERIFY ERROR:", e.message, {
      tokenStart: token?.slice(0, 30) + "...",
      secret: process.env.JWT_SECRET,
    });
    throw e;
  }
};

// Refresh token
export const signRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d", // довший час життя
  });
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
