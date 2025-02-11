"use client";

import { useChat } from "@/context/chatContext";
import { useState } from "react";

export default function Chat() {
  const { messages, sendMessage, loading } = useChat();
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-background">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-md ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <p className="text-gray-500">Thinking...</p>}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1 rounded-lg text-gray-500"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-primary text-white rounded-lg"
        >Send</button>
      </div>
    </div>
  );
}
