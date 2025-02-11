"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface IMessage {
  role: "user" | "assistant";
  content: string;
}

interface IChatContextType {
  messages: IMessage[];
  loading: boolean;
  sendMessage: (message: string) => Promise<void>;
}
const ChatContext = createContext<IChatContextType | undefined>(undefined);

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedMessages = localStorage.getItem("@ChatHistory");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("@ChatHistory", JSON.stringify(messages));
  }, []);

  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages: IMessage[] = [
      ...messages,
      { role: "user", content: message },
    ];
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      newMessages.push({ role: "assistant", content: data.reply });
    } catch (error) {
      console.error(error);
      newMessages.push({
        role: "assistant",
        content: "Error fetching response.",
      });
    }
    setMessages(newMessages);
    setLoading(false);
  };

  return (
    <ChatContext.Provider value={{ messages, loading, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a Provider");
  return context;
};
