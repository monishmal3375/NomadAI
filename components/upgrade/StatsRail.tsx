"use client";

import StatsPanel from "../StatsPanel";
import IntentCard, { Intent } from "../IntentCard";

export default function StatsRail({
  intent,
  onOpenExport,
}: {
  intent: Intent;
  onOpenExport: () => void;
}) {
  return (
    <section className="h-full min-h-0 min-w-0 flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-6">
        <IntentCard intent={intent} />
        <StatsPanel />

        <div className="rounded-3xl glass elevated premium-hover p-5">
          <div className="text-sm font-semibold text-slate-900">Export / Save</div>
          <div className="mt-1 text-sm text-slate-500">
            Save your itinerary or export to PDF.
          </div>

          <button
            onClick={onOpenExport}
            className="mt-4 h-11 w-full rounded-2xl text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition"
          >
            Export PDF
          </button>
        </div>
      </div>
    </section>
  );
}