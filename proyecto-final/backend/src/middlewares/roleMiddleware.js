export const requireRole =
  (...roles) =>
  (req, res, next) => {
    const names = req.user?.roleNames || [];
    const ok = names.some((r) => roles.includes(r));
    if (!ok) return res.status(403).json({ error: "Forbidden" });
    next();
  };
