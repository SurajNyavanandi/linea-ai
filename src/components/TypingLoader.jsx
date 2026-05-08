function TypingLoader() {
  return (
    <div className="flex justify-start">
      <div className="bg-[#1e1e1e] px-4 py-3 rounded-2xl flex gap-1">
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]"></span>
      </div>
    </div>
  );
}

export default TypingLoader;