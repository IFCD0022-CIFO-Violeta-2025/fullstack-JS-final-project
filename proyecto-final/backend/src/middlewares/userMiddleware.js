import { userSchema } from "../validations/userSchemas.js";

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details.map((d) => d.message) });
  }
  next();
};
