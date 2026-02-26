// src/models/Note.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },

    // Display name
    fileName: {
        type: String,
        required: true
    },

    // ❗ REQUIRED for extraction
    filePath: {
        type: String,
        required: true
    },

    fileType: {
        type: String,
        required: true
    },

    fileSize: Number,

    uploadDate: {
        type: Date,
        default: Date.now
    },

    extractedText: String,

    chunks: [
        {
            chunkId: String,
            content: String,
            pageNumber: Number
        }
    ]
});

module.exports = mongoose.model("Note", noteSchema);