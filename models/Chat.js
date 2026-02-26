const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    question: { type: String, required: true },
    answer: { type: String, required: true },

    citations: [
        {
            fileName: String,
            pageNumber: Number,
            chunkId: String
        }
    ],

    evidenceSnippets: [
        {
            text: String,
            fileName: String,
            pageNumber: Number
        }
    ],

    confidenceLevel: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Medium"
    },

    notFound: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chat", chatSchema);