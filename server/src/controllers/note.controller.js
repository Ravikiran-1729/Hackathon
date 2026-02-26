// src/controllers/note.controller.js
const Note = require("../models/Note");
const Subject = require("../models/Subject");

exports.uploadNotes = async (req, res) => {
    try {
        console.log("📤 Incoming files:", req.files?.length);

        // ✅ Guard: files required
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded"
            });
        }

        const { subjectName, userId } = req.body;

        // ✅ Guard: required fields
        if (!subjectName || !userId) {
            return res.status(400).json({
                success: false,
                message: "subjectName and userId are required"
            });
        }

        // 1️⃣ Find or Create Subject
        let subject = await Subject.findOne({ subjectName, userId });

        if (!subject) {
            console.log("🆕 Creating new subject:", subjectName);

            subject = await Subject.create({
                subjectName,
                userId
            });
        }

        const noteIds = [];

        // 2️⃣ Save Notes
        for (const file of req.files) {
            console.log("📄 Saving note:", file.originalname);

            const note = await Note.create({
                subjectId: subject._id,

                // ✅ FIX: proper separation
                fileName: file.originalname, // for UI / display
                filePath: file.path,         // for extraction
                fileType: file.mimetype,
                fileSize: file.size
            });

            noteIds.push(note._id);
        }

        return res.status(201).json({
            success: true,
            subjectId: subject._id,
            noteIds
        });

    } catch (error) {
        console.error("🔥 Upload Notes Error:", error);
        return res.status(500).json({
            success: false,
            message: "Upload failed"
        });
    }
};