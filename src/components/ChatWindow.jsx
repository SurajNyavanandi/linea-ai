import { useEffect, useRef, useState } from "react";
import EmptyState from "./EmptyState";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import TypingLoader from "./TypingLoader";
import { generateResponse } from "../services/openai";

function ChatWindow({
  conversations,
  setConversations,
  activeConversation,
}) {
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [activeConversation, loading]);

  const handleSendMessage = async (text, lines) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    const updatedMessages = [
      ...activeConversation.messages,
      userMessage,
    ];

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === activeConversation.id
          ? {
              ...chat,
              title:
                chat.messages.length === 0
                  ? text.slice(0, 30)
                  : chat.title,
              messages: updatedMessages,
            }
          : chat
      )
    );

    setLoading(true);

    try {
      const aiResponse = await generateResponse(
        updatedMessages,
        lines
      );

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: aiResponse,
      };

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeConversation.id
            ? {
                ...chat,
                messages: [
                  ...updatedMessages,
                  aiMessage,
                ],
              }
            : chat
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 min-h-full">
          {activeConversation.messages.length ===
          0 ? (
            <EmptyState />
          ) : (
            activeConversation.messages.map(
              (message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                />
              )
            )
          )}

          {loading && <TypingLoader />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput
        onSend={handleSendMessage}
        loading={loading}
      />
    </main>
  );
}

export default ChatWindow;