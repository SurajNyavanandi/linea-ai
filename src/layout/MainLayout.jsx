import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { initialConversations } from "../data/chats";

function MainLayout() {
  const [conversations, setConversations] =
    useState(initialConversations);

  const [activeChatId, setActiveChatId] =
    useState(initialConversations[0].id);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

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

    setSidebarOpen(false);
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen bg-[#0f0f0f] text-white flex overflow-hidden relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static z-50 md:z-auto
          top-0 left-0 h-full
          transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <Sidebar
          conversations={conversations}
          activeChatId={activeChatId}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/10">
          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <Menu size={22} />
          </button>

          <h1 className="font-medium">
            Linea AI
          </h1>

          <div className="w-10" />
        </header>

        <ChatWindow
          conversations={conversations}
          setConversations={setConversations}
          activeConversation={activeConversation}
        />
      </div>
    </div>
  );
}

export default MainLayout;