// src/models/Subject.js
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    subjectName: {
        type: String,
        required: true,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ✅ CORRECT way to enforce uniqueness
subjectSchema.index(
    { userId: 1, subjectName: 1 },
    { unique: true }
);

module.exports = mongoose.model("Subject", subjectSchema);