const Joi = require("@hapi/joi");

const createPatientSchema = Joi.object({
  name: Joi.string().trim().required(),
  surname: Joi.string().required(),
  password: Joi.string().min(6).max(72, "utf8").required(),
  email: Joi.string().min(6).required().email(),
});

const updatePatientSchema = Joi.object({
  name: Joi.string().trim().optional(),
  surname: Joi.string().optional(),
  password: Joi.string().min(6).max(72, "utf8").optional(),
  email: Joi.string().min(6).optional().email(),
});

module.exports = { createPatientSchema, updatePatientSchema };
