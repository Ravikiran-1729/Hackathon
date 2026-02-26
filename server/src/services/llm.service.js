// src/services/llm.service.js
const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

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

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        });

        if (!response.choices || !response.choices[0]?.message?.content) {
            throw new Error("Invalid response from LLM");
        }

        console.log("🤖 [LLM] Response received");
        return response.choices[0].message.content;

    } catch (err) {
        console.error("🔥 [LLM] Error:", err.message);
        throw new Error("LLM generation failed");
    }
};