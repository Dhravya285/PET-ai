const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Get the model - make sure this name is correct
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Updated model name
    
    // For chat functionality, you should use a chat session
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    const responseText = result.response.text();
    
    res.json({ reply: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to fetch response from Gemini AI", details: error.message });
  }
});

module.exports = router;