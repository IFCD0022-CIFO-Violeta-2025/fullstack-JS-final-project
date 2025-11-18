import Joi from "joi";

export const commentSchema = Joi.object({
  idEvent: Joi.number().integer().allow(null),
  idPost: Joi.number().integer().allow(null),
  content: Joi.string().min(1).required(),
});
