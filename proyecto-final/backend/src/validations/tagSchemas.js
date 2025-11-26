import Joi from "joi";

export const tagSchema = Joi.object({
  name: Joi.string().max(50).required(),
});
