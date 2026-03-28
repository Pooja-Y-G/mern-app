// testCohereChat.ts
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const COHERE_KEY = process.env.COHERE_API_KEY;
console.log("COHERE_KEY:", COHERE_KEY?.slice(0,10));

(async () => {
  try {
    if (!COHERE_KEY) throw new Error("COHERE_KEY missing");

    const response = await axios.post(
      "https://api.cohere.com/v1/chat/completions",
      {
        model: "command-xlarge-nightly",
        messages: [
          {
            role: "system",
            content: "You are an assistant that summarizes text clearly and concisely.",
          },
          {
            role: "user",
            content: "Please summarize the following text: This is a long text that needs to be summarized for testing purposes.",
          },
        ],
        max_tokens: 150,
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.choices?.[0]?.message?.content?.trim();
    console.log("AI Summary:", summary);
  } catch (err: any) {
    console.error("Cohere Chat API Error:", err.response?.data || err.message);
  }
})();