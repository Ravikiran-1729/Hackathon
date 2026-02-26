const Joi = require("joi");

// Validation for creating a new user
const createUserSchema = Joi.object({
  email: Joi.string().email().required()
});

// Validation for updating a user (partial updates allowed)
const updateUserSchema = Joi.object({
  email: Joi.string().email()
}).min(1);

module.exports = {
  createUserSchema,
  updateUserSchema
};

