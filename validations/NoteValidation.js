const Joi = require("joi");

const chunkSchema = Joi.object({
  chunkId: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
  pageNumber: Joi.number().integer().min(1).required()
});

const createNoteSchema = Joi.object({
  subjectId: Joi.string().required(),
  fileName: Joi.string().trim().required(),
  fileType: Joi.string().trim().required(),
  fileSize: Joi.number().integer().min(0),
  uploadDate: Joi.date(),
  extractedText: Joi.string().allow(""),
  chunks: Joi.array().items(chunkSchema)
});

const updateNoteSchema = Joi.object({
  subjectId: Joi.string(),
  fileName: Joi.string().trim(),
  fileType: Joi.string().trim(),
  fileSize: Joi.number().integer().min(0),
  uploadDate: Joi.date(),
  extractedText: Joi.string().allow(""),
  chunks: Joi.array().items(chunkSchema)
}).min(1);

module.exports = {
  createNoteSchema,
  updateNoteSchema
};

