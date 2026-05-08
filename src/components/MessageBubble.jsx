import ReactMarkdown from "react-markdown";

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`w-full flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl px-4 py-3 rounded-2xl text-sm leading-7 ${
          isUser
            ? "bg-white text-black"
            : "bg-[#1e1e1e] text-gray-100"
        }`}
      >
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default MessageBubble;