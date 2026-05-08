function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-semibold mb-4">
        What can I help with?
      </h1>

      <p className="text-gray-400 max-w-md">
        Ask anything about development, AI, design, or productivity.
      </p>
    </div>
  );
}

export default EmptyState;