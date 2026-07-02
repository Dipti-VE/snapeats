import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    console.log("====================================");
    console.log("📨 Chat Request Received");
    console.log("User Message:", message);
    console.log("OPENAI_API_KEY Exists:", !!process.env.OPENAI_API_KEY);

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    console.log("🚀 Sending request to OpenAI...");
    console.time("OpenAI Response Time");

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are SnapEats AI Shopping Assistant.

Your job is to:
- Help users find products.
- Recommend products.
- Compare products.
- Answer shopping questions.
- Be friendly and professional.
- Keep responses short and easy to understand.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    console.timeEnd("OpenAI Response Time");

    console.log("✅ OpenAI Response Received");
    console.log(
      "Reply:",
      completion?.choices?.[0]?.message?.content
    );

    return res.status(200).json({
      success: true,
      reply: completion.choices?.[0]?.message?.content || "No response from AI",
    });

  } catch (error) {
    console.error("====================================");
    console.error("❌ OpenAI Error");
    console.error("Message:", error.message);
    console.error("Status:", error.status);
    console.error("Code:", error.code);
    console.error("Full Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};