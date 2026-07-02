import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

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

    return res.status(200).json({
      success: true,
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};