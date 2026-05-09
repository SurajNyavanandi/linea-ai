import { useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";

function ChatInput({ onSend, loading }) {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState("manual");

  const textareaRef = useRef(null);

  const handleSubmit = () => {
    if (!input.trim() || loading) return;

    onSend(input, lines);

    setInput("");

    textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  };

  return (
    <div className="border-t border-white/10 p-4">
      <div className="max-w-3xl mx-auto bg-[#1e1e1e] rounded-2xl border border-white/10 flex items-end px-4 py-3 gap-3">

        {/* TEXT AREA */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Message Linea AI..."
          disabled={loading}
          className="flex-1 bg-transparent resize-none outline-none text-sm placeholder:text-gray-500 max-h-40 disabled:opacity-60"
        />

        {/* LINE SELECT DROPDOWN */}
        <select
          value={lines}
          onChange={(e) => setLines(e.target.value)}
          className="bg-[#2a2a2a] text-white text-sm px-2 py-2 rounded-lg outline-none border border-white/10"
        >
          <option value="manual">Manual Reply</option>
          <option value="1">1 line</option>
          <option value="3">3 lines</option>
          <option value="5">5 lines</option>
          <option value="9">9 lines</option>
        </select>

        {/* SEND BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-white text-black p-2 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
        >
          <SendHorizonal size={18} />
        </button>

      </div>
    </div>
  );
}

export default ChatInput;