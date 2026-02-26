const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    totalSubjects: { type: Number, default: 0 },
    totalNotes: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    totalStudySets: { type: Number, default: 0 },

    highConfidenceCount: { type: Number, default: 0 },
    mediumConfidenceCount: { type: Number, default: 0 },
    lowConfidenceCount: { type: Number, default: 0 },

    notFoundCount: { type: Number, default: 0 },

    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Dashboard", dashboardSchema);