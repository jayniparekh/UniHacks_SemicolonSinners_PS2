// server/controllers/aiController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Optional: if you already have auth middleware that sets req.user,
// you can use it. Otherwise, this endpoint can accept profile in body.

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function safeStringify(obj) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return String(obj);
  }
}

exports.reviewUserProfile = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY missing in server .env" });
    }

    const { profile, prompt } = req.body;

    if (!profile) {
      return res.status(400).json({ error: "profile is required in request body" });
    }

    // You can tune this model name if needed.
    // Commonly used: "gemini-1.5-flash" or "gemini-1.5-pro"
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction =
      "You are an expert reviewer. Be concise, practical, and structured. " +
      "Return: (1) Summary, (2) Strengths, (3) Risks/Gaps, (4) Actionable recommendations, (5) Score out of 10.";

    const userPrompt =
      (prompt?.trim()
        ? `User request: ${prompt.trim()}\n\n`
        : "User request: Review this user's profile and suggest improvements.\n\n") +
      `User profile JSON:\n${safeStringify(profile)}`;

    const finalPrompt = `${systemInstruction}\n\n${userPrompt}`;

    const result = await model.generateContent(finalPrompt);
    const text = result?.response?.text?.() || "";

    return res.status(200).json({
      ok: true,
      review: text,
    });
  } catch (err) {
    console.error("Gemini review error:", err);
    return res.status(500).json({
      ok: false,
      error: "Failed to generate AI review",
      details: err?.message || String(err),
    });
  }
};
