"use client";

import { useChat } from "@/context/chatContext";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const { messages, sendMessage, loading } = useChat();
  const [input, setInput] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="border rounded-lg p-2 flex flex-col h-96 overflow-y-auto bg-background">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-md w-fit max-w-[95%] ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-500"
            }`}
          >
            <ReactMarkdown
              components={{
                pre: ({ children }) => (
                  <pre className="p-2 bg-gray-800 text-white rounded-md break-words whitespace-pre-wrap">
                    {children}
                  </pre>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-900 p-1 rounded-md">{children}</code>
                ),
              }}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        ))}
        <div ref={messageEndRef} />
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
        >
          Send
        </button>
      </div>
    </div>
  );
}
