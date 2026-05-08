function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
          Crowdbuzz Technologies Pvt Ltd
        </p>

        <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
          Linea AI Chat Interface
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          A modern AI-powered chat experience built with
          React.js, Tailwind CSS, and OpenAI Responses API.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
          Developed by
          <span className="text-white font-medium">
            Suraj Nyavanandi
          </span>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;