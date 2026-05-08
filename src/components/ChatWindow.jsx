import { useEffect, useRef, useState } from "react";
import EmptyState from "./EmptyState";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import TypingLoader from "./TypingLoader";
import { initialMessages } from "../data/chats";

function ChatWindow() {
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "This is a mock AI response. OpenAI integration comes in Phase 3.",
      };

      setMessages((prev) => [...prev, aiMessage]);

      setLoading(false);
    }, 1500);
  };

  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
              />
            ))
          )}

          {loading && <TypingLoader />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSend={handleSendMessage} />
    </main>
  );
}

export default ChatWindow;