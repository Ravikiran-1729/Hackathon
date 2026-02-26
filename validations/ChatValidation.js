const Joi = require("joi");

const citationSchema = Joi.object({
  fileName: Joi.string().trim().required(),
  pageNumber: Joi.number().integer().min(1).required(),
  chunkId: Joi.string().trim().required()
});

const evidenceSnippetSchema = Joi.object({
  text: Joi.string().trim().required(),
  fileName: Joi.string().trim().required(),
  pageNumber: Joi.number().integer().min(1).required()
});

const createChatSchema = Joi.object({
  userId: Joi.string().required(),
  subjectId: Joi.string().required(),
  question: Joi.string().trim().required(),
  answer: Joi.string().trim().required(),
  citations: Joi.array().items(citationSchema),
  evidenceSnippets: Joi.array().items(evidenceSnippetSchema),
  confidenceLevel: Joi.string().valid("High", "Medium", "Low"),
  notFound: Joi.boolean()
});

const updateChatSchema = Joi.object({
  userId: Joi.string(),
  subjectId: Joi.string(),
  question: Joi.string().trim(),
  answer: Joi.string().trim(),
  citations: Joi.array().items(citationSchema),
  evidenceSnippets: Joi.array().items(evidenceSnippetSchema),
  confidenceLevel: Joi.string().valid("High", "Medium", "Low"),
  notFound: Joi.boolean()
}).min(1);

module.exports = {
  createChatSchema,
  updateChatSchema
};

