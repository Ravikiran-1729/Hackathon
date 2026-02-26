// src/services/pdf.service.js
const fs = require("fs/promises");
const pdfParse = require("pdf-parse");

exports.extractPDFText = async (filePath) => {
    try {
        console.log("📘 [PDF] Extracting text:", filePath);

        const buffer = await fs.readFile(filePath); // ✅ async, non-blocking
        const data = await pdfParse(buffer);

        return data.text || "";

    } catch (err) {
        console.error("🔥 [PDF] Extraction failed:", err.message);
        throw new Error("PDF extraction failed");
    }
};