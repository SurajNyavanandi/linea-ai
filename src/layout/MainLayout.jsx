import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { initialConversations } from "../data/chats";

function MainLayout() {
  const [conversations, setConversations] =
    useState(initialConversations);

  const [activeChatId, setActiveChatId] =
    useState(initialConversations[0].id);

  const activeConversation =
    conversations.find(
      (chat) => chat.id === activeChatId
    );

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setConversations((prev) => [
      newChat,
      ...prev,
    ]);

    setActiveChatId(newChat.id);
  };

  return (
    <div className="h-screen bg-[#0f0f0f] text-white flex overflow-hidden">
      <Sidebar
        conversations={conversations}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={setActiveChatId}
      />

      <ChatWindow
        conversations={conversations}
        setConversations={setConversations}
        activeConversation={activeConversation}
      />
    </div>
  );
}

export default MainLayout;