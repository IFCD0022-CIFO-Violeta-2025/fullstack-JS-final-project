import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().min(3).max(20),
  name: Joi.string().max(50),
  lastName: Joi.string().max(50),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(128),
  avatar_url: Joi.string().uri().allow("", null),
  aboutMe: Joi.string().allow("", null),
  address: Joi.string().allow("", null),
  birthday: Joi.date().allow(null),
  documentType: Joi.string().max(10),
  documentNumber: Joi.string().max(15),
  news_subscription: Joi.boolean(),
  banned: Joi.boolean(),
});
