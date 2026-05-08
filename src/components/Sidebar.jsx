import { MessageSquarePlus } from "lucide-react";

function Sidebar({
  conversations,
  activeChatId,
  onNewChat,
  onSelectChat,
}) {
  return (
    <aside className="w-[260px] bg-[#171717] border-r border-white/10 flex flex-col p-4 h-screen">
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
      >
        <MessageSquarePlus size={18} />
        New Chat
      </button>

      <div className="mt-6 flex flex-col gap-2 overflow-y-auto">
        {conversations.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`text-left px-3 py-3 rounded-lg transition text-sm truncate ${
              activeChatId === chat.id
                ? "bg-white/10 text-white"
                : "hover:bg-white/5 text-gray-300"
            }`}
          >
            {chat.title}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;