import { useState } from "react";
import axios from "axios";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm SnapEats AI. Ask me for food recommendations, healthy meals, pizza suggestions, budget meals, and more!"
    }
  ]);

  const suggestions = [
    "🍕 Recommend Pizza",
    "🍔 Best Burger",
    "🥗 Healthy Food",
    "💰 Meals under ₹300"
  ];

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Hi! I'm SnapEats AI. How can I help you today?"
      }
    ]);
  };

  const sendMessage = async (customMessage) => {
    const userMessage = customMessage || message;

    if (!userMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage
      }
    ]);

    setMessage("");
    setLoading(true);

    try {
     const res = await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
  {
    message: userMessage,
  }
);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data.reply
        }
      ]);
    } catch (err) {
  console.log("Chat Error:", err);
  console.log("Response:", err.response);

  setMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text:
        err.response?.data?.message ||
        err.message ||
        "Something went wrong."
    }
  ]);
}

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          border: "none",
          background: "#ff5722",
          color: "#fff",
          fontSize: "28px",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
          zIndex: 9999
        }}
      >
        🤖
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "95px",
            right: "20px",
            width: "400px",
            height: "600px",
            background: "#fff",
            borderRadius: "18px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            zIndex: 9999
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#ff5722",
              color: "#fff",
              padding: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                🤖 SnapEats AI
              </div>
              <div style={{ fontSize: "12px" }}>
                Online ●
              </div>
            </div>

            <button
              onClick={clearChat}
              style={{
                background: "#fff",
                color: "#ff5722",
                border: "none",
                borderRadius: "8px",
                padding: "6px 10px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Clear
            </button>
          </div>

          {/* Suggestions */}
          <div
            style={{
              padding: "10px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              borderBottom: "1px solid #eee"
            }}
          >
            {suggestions.map((item, index) => (
              <button
                key={index}
                onClick={() => sendMessage(item)}
                style={{
                  border: "none",
                  background: "#f3f4f6",
                  padding: "8px 12px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "13px"
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "15px",
              background: "#fafafa"
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "12px"
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "12px",
                    borderRadius: "15px",
                    background:
                      msg.sender === "user"
                        ? "#ff5722"
                        : "#e5e7eb",
                    color:
                      msg.sender === "user"
                        ? "#fff"
                        : "#000"
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div
                style={{
                  background: "#e5e7eb",
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "12px"
                }}
              >
                SnapEats AI is typing...
              </div>
            )}
          </div>

          {/* Input Area */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "12px",
              borderTop: "1px solid #eee",
              background: "#fff"
            }}
          >
            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask SnapEats AI anything..."
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "25px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "14px"
              }}
            />

            <button
              onClick={() => sendMessage()}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                border: "none",
                background: "#ff5722",
                color: "#fff",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}