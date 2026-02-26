const mongoose = require("mongoose");

const studySchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    generatedAt: { type: Date, default: Date.now },

    mcqs: [
        {
            question: String,
            options: [String],
            correctOption: String,
            explanation: String,
            citations: [
                {
                    fileName: String,
                    pageNumber: Number,
                    chunkId: String
                }
            ]
        }
    ],

    shortAnswers: [
        {
            question: String,
            modelAnswer: String,
            citations: [
                {
                    fileName: String,
                    pageNumber: Number,
                    chunkId: String
                }
            ]
        }
    ]
});

module.exports = mongoose.model("StudyMaterial", studySchema);