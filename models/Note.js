const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: Number,
    uploadDate: { type: Date, default: Date.now },
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