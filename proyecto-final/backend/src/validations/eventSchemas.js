import Joi from "joi";

export const eventSchema = Joi.object({
  idOrganizer: Joi.number().integer().optional(),
  idLocation: Joi.number().integer().optional(),
  title: Joi.string().max(255).required(),
  description: Joi.string().allow("", null),
  location: Joi.string().max(255).required(),
  subscriptorsOnly: Joi.boolean().default(false),
  visible: Joi.boolean().default(false),
  archived: Joi.boolean().default(false),
  deleted: Joi.boolean().default(false),
  startTime: Joi.date().optional(),
  endTime: Joi.date().optional(),
  reservationLastDate: Joi.date().optional(),
  capacity: Joi.number().integer().min(1).required(),
  image_url: Joi.string().uri().allow("", null),
});
