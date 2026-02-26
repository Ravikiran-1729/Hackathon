// src/services/ppt.service.js
const textract = require("textract");

exports.extractPPTText = async (filePath) => {
    console.log("📙 [PPT] Extracting text:", filePath);

    return new Promise((resolve, reject) => {
        textract.fromFileWithPath(filePath, (err, text) => {
            if (err) {
                console.error("🔥 [PPT] Extraction failed:", err.message);
                return reject(new Error("PPT extraction failed"));
            }
            resolve(text || "");
        });
    });
};