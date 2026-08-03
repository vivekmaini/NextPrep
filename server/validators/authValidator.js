const Joi = require("joi");

const registerSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),
});

module.exports = {
  registerSchema,
};