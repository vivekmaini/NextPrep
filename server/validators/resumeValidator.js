const Joi = require("joi");

const uploadResumeSchema = Joi.object({
  targetRole: Joi.string().max(120).allow("").default(""),
  jobDescription: Joi.string().max(10000).allow("").default(""),
});

const validateResumeUpload = (payload) => uploadResumeSchema.validate(payload, { abortEarly: false, stripUnknown: true });

module.exports = { validateResumeUpload };
