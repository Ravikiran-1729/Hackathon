const Joi = require("joi");

const createDashboardSchema = Joi.object({
  userId: Joi.string().required(),
  totalSubjects: Joi.number().integer().min(0),
  totalNotes: Joi.number().integer().min(0),
  totalQuestions: Joi.number().integer().min(0),
  totalStudySets: Joi.number().integer().min(0),
  highConfidenceCount: Joi.number().integer().min(0),
  mediumConfidenceCount: Joi.number().integer().min(0),
  lowConfidenceCount: Joi.number().integer().min(0),
  notFoundCount: Joi.number().integer().min(0),
  lastUpdated: Joi.date()
});

const updateDashboardSchema = Joi.object({
  userId: Joi.string(),
  totalSubjects: Joi.number().integer().min(0),
  totalNotes: Joi.number().integer().min(0),
  totalQuestions: Joi.number().integer().min(0),
  totalStudySets: Joi.number().integer().min(0),
  highConfidenceCount: Joi.number().integer().min(0),
  mediumConfidenceCount: Joi.number().integer().min(0),
  lowConfidenceCount: Joi.number().integer().min(0),
  notFoundCount: Joi.number().integer().min(0),
  lastUpdated: Joi.date()
}).min(1);

module.exports = {
  createDashboardSchema,
  updateDashboardSchema
};

