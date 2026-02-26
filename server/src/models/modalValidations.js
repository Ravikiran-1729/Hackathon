const Joi = require("joi");

const User_Joi = Joi.object({
    user: Joi.object({
        username: Joi.string()
            .trim()
            .min(3)
            .max(30)
            .required()
            .messages({
                "string.min": "Username must be at least 3 characters long",
                "string.max": "Username cannot exceed 30 characters",
                "string.empty": "Username is required",
            }),

        email: Joi.string()
            .trim()
            .email({ minDomainSegments: 2 })
            .required()
            .messages({
                "string.email": "Invalid email address",
                "string.empty": "Email is required",
            }),

        password: Joi.string()
            .min(8)
            .max(30)
            .required()
            .messages({
                "string.min": "Password must be at least 8 characters long",
                "string.max": "Password cannot exceed 30 characters",
                "string.empty": "Password is required",
            }),

        repeat_password: Joi.string()
            .valid(Joi.ref("password"))
            .required()
            .messages({
                "any.only": "Passwords do not match",
                "string.empty": "Repeat password is required",
            }),
    })
        .required()
        .with("password", "repeat_password"),
});

module.exports = { User_Joi };
