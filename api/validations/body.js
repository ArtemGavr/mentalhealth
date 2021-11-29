const Joi = require("@hapi/joi");

const createBodySchema = Joi.object({
  weight: Joi.number().min(30).max(200).required(),
  height: Joi.number().min(100).max(220).required(),
});

module.exports = { createBodySchema };