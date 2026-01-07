export default function MapPanel() {
  return (
    <section className="h-full rounded-3xl glass elevated premium-hover relative overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(59,130,246,0.14),transparent_52%),radial-gradient(circle_at_82%_85%,rgba(148,163,184,0.22),transparent_58%)]" />

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="none">
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={(i * 800) / 14}
              y1="0"
              x2={(i * 800) / 14}
              y2="600"
              stroke="black"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={(i * 600) / 10}
              x2="800"
              y2={(i * 600) / 10}
              stroke="black"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      {/* TOP-RIGHT: View spots button (absolute, so it aligns with Saved trips) */}
      <div className="absolute right-[148px] top-4 z-20">
        <button className="h-10 px-4 rounded-2xl bg-white/70 border border-white/40 text-sm font-medium text-slate-800 hover:bg-white transition">
          View spots
        </button>
      </div>

      <div className="relative h-full p-6">
        {/* top header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-slate-500">Destination</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">
              London <span className="text-slate-400">·</span> 3 days
            </div>
            <div className="mt-2 flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 rounded-full bg-white/60 border border-white/40 text-slate-600">
                Live weather
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-white/60 border border-white/40 text-slate-600">
                Currency synced
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-white/60 border border-white/40 text-slate-600">
                Route optimized
              </span>
            </div>
          </div>

          {/* removed inline button here to prevent overlap */}
          <div />
        </div>

        {/* route line */}
        <div className="absolute inset-0 opacity-[0.22] pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="none">
            <path
              d="M120 420 C220 260, 320 280, 410 240 C520 190, 610 230, 690 170"
              stroke="rgba(15,23,42,0.7)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="10 10"
            />
          </svg>
        </div>

        {/* pins */}
        <Pin x="22%" y="70%" label="D1" />
        <Pin x="52%" y="50%" label="D2" />
        <Pin x="76%" y="32%" label="D3" />

        {/* floating city pill */}
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 rounded-2xl bg-slate-900 text-white px-4 py-3 shadow-md flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/15" />
          <div>
            <div className="text-xs opacity-70">City</div>
            <div className="text-sm font-medium">Central London</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pin({ x, y, label }: { x: string; y: string; label: string }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
      <div className="h-11 w-11 rounded-full bg-slate-900 shadow-md flex items-center justify-center">
        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
          <span className="text-xs font-semibold text-white">{label}</span>
        </div>
      </div>
      <div className="mx-auto mt-2 h-2 w-2 rounded-full bg-slate-900/70" />
    </div>
  );
}