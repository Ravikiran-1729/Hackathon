const Joi = require("joi");

const createSubjectSchema = Joi.object({
  userId: Joi.string().required(),
  subjectName: Joi.string().trim().min(1).required()
});

const updateSubjectSchema = Joi.object({
  userId: Joi.string(),
  subjectName: Joi.string().trim().min(1)
}).min(1);

module.exports = {
  createSubjectSchema,
  updateSubjectSchema
};

