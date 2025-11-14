const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "No tienes permisos para esta acción" });
    }
    next();
  };
};

export default checkRole;
