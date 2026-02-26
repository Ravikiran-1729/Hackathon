// src/controllers/chat.controller.js
const Note = require("../models/Note");
const Subject = require("../models/Subject");
const { extractPDFText } = require("../services/pdf.service");
const { extractPPTText } = require("../services/ppt.service");
const { generateQuestions } = require("../services/llm.service");

exports.generateFromNotes = async (req, res) => {
    try {
        console.log("💬 [CHAT] Request received");

        const { noteIds } = req.body;

        // ✅ Guard: validate input
        if (!Array.isArray(noteIds) || noteIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "noteIds array is required"
            });
        }

        // Fetch notes and populate subject for ownership check
        const notes = await Note.find({ _id: { $in: noteIds } }).populate("subjectId");

        if (notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No notes found"
            });
        }

        let combinedText = "";

        for (const note of notes) {
            if (!note.extractedText) {
                console.log("🧠 [CHAT] Extracting:", note.fileName);

                if (note.fileType.includes("pdf")) {
                    note.extractedText = await extractPDFText(note.filePath);
                } else if (
                    note.fileType.includes("presentation") ||
                    note.fileType.includes("powerpoint")
                ) {
                    note.extractedText = await extractPPTText(note.filePath);
                } else {
                    console.warn("⚠️ [CHAT] Unsupported file type:", note.fileType);
                    continue;
                }

                await note.save();
            }

            combinedText += note.extractedText + "\n";
        }

        combinedText = combinedText.trim();

        if (!combinedText) {
            return res.status(400).json({
                success: false,
                message: "No extractable content found in notes or user unauthorized"
            });
        }

        const questions = await generateQuestions(combinedText);

        return res.json({
            success: true,
            questions
        });

    } catch (error) {
        console.error("🔥 [CHAT] Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate questions"
        });
    }
};