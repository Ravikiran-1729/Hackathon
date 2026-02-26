// middlewares/errorHandler.js
const AppError = require("../utils/AppError");

module.exports = (err, req, res, next) => {
    // Default values
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Joi validation error
    if (err.isJoi) {
        statusCode = 400;
        message = "Validation error";
        return res.status(statusCode).json({
            success: false,
            message,
            errors: err.details.map(d => d.message),
        });
    }

    // Mongo duplicate key error
    if (err.code === 11000) {
        statusCode = 409;
        message = "Duplicate field value";
    }

    // AppError (expected)
    if (err.isOperational) {
        return res.status(statusCode).json({
            success: false,
            message,
            errors: err.errors || null,
        });
    }

    // Unknown / programming error
    console.error("🔥 UNEXPECTED ERROR:", err);

    return res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
};