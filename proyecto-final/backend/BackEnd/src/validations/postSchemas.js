import Joi from "joi";

export const postSchema = Joi.object({
  content: Joi.string().min(1).required(),
  image_url: Joi.string().uri().allow("", null),
});
