"use client";

import { useChat } from "@/context/chatContext";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const { messages, sendMessage, loading, clearChat } = useChat();
  const [input, setInput] = useState("");
  const [modal, setModal] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  const confirm = () => {
    clearChat()
    setModal(false)
  }

  return (
    <div className="relative max-w-lg mx-auto p-4">
      {modal && <div className="absolute top-20 left-10 bg-accentActive w-[350px] rounded-md p-8">
        <h2 className="font-bold p-2">Tem certeza que deseja limpar o histórico da conversa?</h2>
        <div className="flex justify-evenly">

        <button className="px-2 w-[40%] rounded-md bg-secondary hover:bg-accentHover" onClick={()=> setModal(false)}>Cancelar</button><button className="px-2 w-[40%] rounded-md bg-secondary hover:bg-accentHover" onClick={confirm}>Apagar</button>
        </div>
        </div>}
      <div className="border rounded-lg p-2 flex flex-col h-96 overflow-y-auto bg-background">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-md w-fit max-w-[95%] ${
              msg.role === "user"
                ? "bg-primary text-white self-end"
                : "bg-secondary"
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
        {loading && <p className="text-secondary">Thinking...</p>}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1 rounded-lg text-secondary outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-primary text-white rounded-lg"
        >
          Send
        </button>
      </div>
      <button
        className="bg-secondary p-2 hover:bg-secondaryHover active:bg-accentActive mt-1"
        onClick={() => setModal(true)}
      >
        Clear chat history
      </button>
    </div>
  );
}
