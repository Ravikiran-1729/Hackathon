// src/services/llm.service.js
exports.generateQuestions = async (text) => {
    try {
        console.log("🤖 [LLM] Sending text length:", text.length);

        if (!text || !text.trim()) {
            throw new Error("No content provided for question generation");
        }

        const prompt = `
You are an AI assistant generating exam questions.

Generate:
- 5 MCQs (with options and correct answer)
- 3 short answer questions

ONLY use the content inside <CONTENT> tags.
<CONTENT>
${text.slice(0, 12000)}
</CONTENT>
`;

        // Call external n8n workflow instead of local generation
        const reqBody = {
            sessionId: "notes-session",
            action: "generateQuestions",
            chatInput: prompt,
        };

        const res = await fetch(
            "https://ravikiran-1729.app.n8n.cloud/webhook/professionalAssist",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            }
        );

        if (!res.ok) {
            const errorText = await res.text().catch(() => "");
            console.error("🔥 [LLM] n8n error:", res.status, errorText);
            throw new Error(`n8n request failed with status ${res.status}`);
        }

        const data = await res.json().catch(() => ({}));

        // Prefer structured 'output' from n8n
        const raw =
            data.output ||
            data.answer ||
            data.response ||
            data.result ||
            data.questions ||
            (typeof data === "string" ? data : JSON.stringify(data, null, 2));

        // Convert newlines to <br> so the frontend can render
        // nicely formatted questions and options via innerHTML.
        const html = raw.replace(/\n/g, "<br>");

        console.log("🤖 [LLM] n8n response received");
        return html;

    } catch (err) {
        console.error("🔥 [LLM] Error:", err.message);
        throw new Error("LLM generation failed");
    }
};