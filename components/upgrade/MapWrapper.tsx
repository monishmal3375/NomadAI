"use client";

import MapPanel from "../MapPanel";

export default function MapWrapper({ onOpenTrips }: { onOpenTrips: () => void }) {
  return (
    <section className="h-full min-h-0 min-w-0 relative overflow-hidden">
      {/* overlay buttons row */}
      <div className="absolute right-4 top-4 z-30 flex items-center gap-2">
        <button
          onClick={onOpenTrips}
          className="h-10 px-4 rounded-2xl bg-white/70 border border-white/55 text-sm text-slate-800 hover:bg-white transition"
        >
          Saved trips
        </button>
      </div>

      <div className="h-full min-h-0">
        <MapPanel />
      </div>
    </section>
  );
}