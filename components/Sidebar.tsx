export default function Sidebar() {
  return (
    <aside className="w-16 rounded-3xl bg-slate-900 text-white shadow-sm flex flex-col items-center py-6">
      <div className="h-10 w-10 rounded-2xl bg-white/10 mb-8" />

      <nav className="flex flex-col gap-6 opacity-90">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            className="h-10 w-10 rounded-2xl hover:bg-white/10 transition flex items-center justify-center"
            aria-label={`nav-${i}`}
          >
            <div className="h-5 w-5 rounded bg-white/25" />
          </button>
        ))}
      </nav>

      <div className="mt-auto h-10 w-10 rounded-full bg-white/20" />
    </aside>
  );
}