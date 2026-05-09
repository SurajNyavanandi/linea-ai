import { useRef, useState } from "react";
import { SendHorizonal, ChevronDown } from "lucide-react";

function ChatInput({ onSend, loading }) {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState("1");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const textareaRef = useRef(null);
  const dropdownRef = useRef(null);

  const lineOptions = [
    { value: "1", label: "1 line" },
    { value: "3", label: "3 lines" },
    { value: "5", label: "5 lines" },
    { value: "9", label: "9 lines" },
  ];

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

  const handleSelectOption = (value) => {
    setLines(value);
    setDropdownOpen(false);
  };

  const selectedLabel = lineOptions.find((opt) => opt.value === lines)?.label;

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

        {/* CUSTOM DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            disabled={loading}
            className="bg-[#2a2a2a] text-white text-sm px-3 py-2 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-[#333333] transition disabled:opacity-50"
          >
            <span className="truncate">{selectedLabel}</span>
            <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* DROPDOWN MENU */}
          {dropdownOpen && (
            <div className="absolute bottom-full mb-2 left-0 bg-[#2a2a2a] border border-white/10 rounded-lg shadow-lg z-50 min-w-max">
              {lineOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelectOption(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#3a3a3a] transition ${
                    lines === option.value
                      ? "bg-white/10 text-white font-semibold"
                      : "text-gray-300"
                  } first:rounded-t-lg last:rounded-b-lg`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

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