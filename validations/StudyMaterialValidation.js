const Joi = require("joi");

const citationSchema = Joi.object({
  fileName: Joi.string().trim().required(),
  pageNumber: Joi.number().integer().min(1).required(),
  chunkId: Joi.string().trim().required()
});

const mcqSchema = Joi.object({
  question: Joi.string().trim().required(),
  options: Joi.array().items(Joi.string().trim()).min(1).required(),
  correctOption: Joi.string().trim().required(),
  explanation: Joi.string().trim().allow(""),
  citations: Joi.array().items(citationSchema)
});

const shortAnswerSchema = Joi.object({
  question: Joi.string().trim().required(),
  modelAnswer: Joi.string().trim().required(),
  citations: Joi.array().items(citationSchema)
});

const createStudyMaterialSchema = Joi.object({
  subjectId: Joi.string().required(),
  generatedAt: Joi.date(),
  mcqs: Joi.array().items(mcqSchema),
  shortAnswers: Joi.array().items(shortAnswerSchema)
});

const updateStudyMaterialSchema = Joi.object({
  subjectId: Joi.string(),
  generatedAt: Joi.date(),
  mcqs: Joi.array().items(mcqSchema),
  shortAnswers: Joi.array().items(shortAnswerSchema)
}).min(1);

module.exports = {
  createStudyMaterialSchema,
  updateStudyMaterialSchema
};

