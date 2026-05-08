import { MessageSquarePlus } from "lucide-react";

const chats = [
  "React interview prep",
  "Tailwind UI ideas",
  "OpenAI integration",
];

function Sidebar() {
  return (
    <aside className="hidden md:flex w-[260px] bg-[#171717] border-r border-white/10 flex-col p-4">
      <button className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-xl font-medium hover:bg-gray-200 transition">
        <MessageSquarePlus size={18} />
        New Chat
      </button>

      <div className="mt-6 flex flex-col gap-2">
        {chats.map((chat, index) => (
          <button
            key={index}
            className="text-left px-3 py-3 rounded-lg hover:bg-white/5 transition text-sm text-gray-300"
          >
            {chat}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;