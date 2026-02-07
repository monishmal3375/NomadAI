"use client";

import MapPanel from "../MapPanel";
import type { Intent } from "../IntentCard";

export default function MapWrapper({
  onOpenTrips,
  intent,
}: {
  onOpenTrips: () => void;
  intent?: Intent;
}) {
  const startText = intent?.from ? String(intent.from) : "Chicago, IL";
  const endText = intent?.to ? String(intent.to) : "India";

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

        <button
          type="button"
          className="h-10 px-4 rounded-2xl bg-white/70 border border-white/55 text-sm text-slate-800 hover:bg-white transition"
        >
          View spots
        </button>
      </div>

      <div className="h-full min-h-0">
        <MapPanel startText={startText} endText={endText} />
      </div>
    </section>
  );
}