export default function ChatPanel() {
  return (
    <section className="h-full rounded-3xl glass elevated premium-hover overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/45">
        <div className="text-lg font-semibold text-slate-900">NomadAI</div>
        <div className="text-sm text-slate-500">Trip planning chat</div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 space-y-4 overflow-auto">
        <div className="max-w-[85%] rounded-2xl bg-white/70 border border-white/45 p-4">
          <div className="text-sm text-slate-700">
            Tell me your city, days, and budget.
            <br />
            Example: London for 3 days with $500
          </div>
        </div>

        <div className="ml-auto max-w-[85%] rounded-2xl bg-slate-900 text-white p-4 shadow-sm">
          <div className="text-sm">
            I want to plan a trip to London for 3 days with $500.
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/45">
        <div className="flex items-center gap-3">
          <input
            className="flex-1 h-11 rounded-2xl bg-white/70 border border-white/45 px-4 text-sm outline-none placeholder:text-slate-400"
            placeholder="Write a message…"
          />
          <button className="h-11 w-11 rounded-2xl text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-95 transition">
            →
          </button>
        </div>
      </div>
    </section>
  );
}