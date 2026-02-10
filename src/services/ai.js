/**
 * services/ai.js
 * ───────────────────────────────────────────────
 * Thin wrapper around the Google Generative AI
 * (Gemini) SDK.
 *
 * The prompt instructs the model to reply with
 * a SINGLE WORD so the response is deterministic
 * and concise.
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Ask Gemini a question and get a single-word answer.
 *
 * @param {string} question – the user-supplied question
 * @returns {Promise<string>} – single-word response
 */
async function askGemini(question) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = [
      "You are a concise assistant. Answer the following question in exactly ONE word.",
      "Do not include punctuation, explanations, or extra text.",
      "",
      `Question: ${question}`,
    ].join("\n");

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text().trim();

    // Take only the first word in case the model is chatty
    return text.split(/\s+/)[0].replace(/[^a-zA-Z0-9-]/g, "") || text;
  } catch (err) {
    console.error("Gemini API error:", err.message);
    const wrapped = new Error("AI service unavailable – " + err.message);
    wrapped.statusCode = 502;
    throw wrapped;
  }
}

module.exports = { askGemini };
