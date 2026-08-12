const Joi = require("joi");

const schema = Joi.object({
  mode: Joi.string().valid("Behavioral", "Technical", "HR round").required(),
  difficulty: Joi.string().valid("Gentle", "Balanced", "Stretch").required(),
  question: Joi.string().max(500).required(),
  answer: Joi.string().min(20).max(4000).required(),
});

const validateInterviewAnswer = (payload) => schema.validate(payload, { abortEarly: false, stripUnknown: true });
const sessionSchema = Joi.object({
  mode: Joi.string().valid("Behavioral", "Technical", "HR round").required(),
  difficulty: Joi.string().valid("Gentle", "Balanced", "Stretch").required(),
  responses: Joi.array().min(3).max(6).items(Joi.object({ question: Joi.string().max(500).required(), answer: Joi.string().min(20).max(4000).required() })).required(),
});
const profileSchema = Joi.object({
  mode: Joi.string().valid("Behavioral", "Technical", "HR round").required(),
  difficulty: Joi.string().valid("Gentle", "Balanced", "Stretch").required(),
  targetRole: Joi.string().min(2).max(120).required(),
  experienceLevel: Joi.string().valid("Student / Fresher", "Junior", "Mid-level", "Senior").required(),
  skills: Joi.string().max(500).allow("").default(""),
});
const validateInterviewProfile = (payload) => profileSchema.validate(payload, { abortEarly: false, stripUnknown: true });
const validateInterviewSession = (payload) => sessionSchema.validate(payload, { abortEarly: false, stripUnknown: true });
module.exports = { validateInterviewAnswer, validateInterviewSession, validateInterviewProfile };
