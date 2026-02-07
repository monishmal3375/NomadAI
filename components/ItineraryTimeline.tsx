"use client";

const SAMPLE = {
  1: [
    ["09:00", "Breakfast + coffee", "Quick local spot"],
    ["10:30", "Museum / landmark", "Best morning energy"],
    ["13:00", "Lunch", "Near your next stop"],
    ["15:30", "Walk + viewpoints", "Outdoor if weather ok"],
    ["19:00", "Dinner", "Budget-aware picks"],
    ["21:00", "Night views", "Iconic skyline"],
  ],
  2: [
    ["09:30", "Brunch", "Slow morning"],
    ["11:00", "Indoor activity", "Backup for rain/cold"],
    ["14:00", "Shopping / markets", "Explore"],
    ["18:30", "Dinner", "Local favorites"],
    ["20:30", "Show / cozy plan", "Indoors"],
  ],
  3: [
    ["09:00", "Morning walk", "Final photos"],
    ["11:00", "Top attraction", "Must-see"],
    ["13:00", "Lunch", "Close to transit"],
    ["15:00", "Wrap-up + souvenirs", "Last stop"],
  ],
};

export default function ItineraryTimeline({ day }: { day: number }) {
  const items = (SAMPLE as any)[day] ?? SAMPLE[1];

  return (
    <div className="rounded-3xl glass elevated premium-hover p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-900">Time-blocked plan</div>
          <div className="text-sm text-slate-500">A clean schedule layout (UI demo).</div>
        </div>

        <div className="inline-flex items-center gap-2 text-xs text-slate-600 bg-white/60 border border-white/50 rounded-full px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Auto indoor when needed
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {items.map(([t, title, note]: string[]) => (
          <div
            key={t + title}
            className="rounded-2xl bg-white/70 border border-white/50 p-4 flex gap-4"
          >
            <div className="w-16 shrink-0">
              <div className="text-sm font-semibold text-slate-900">{t}</div>
              <div className="mt-1 h-2 w-2 rounded-full bg-slate-900/30" />
            </div>

            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900">{title}</div>
              <div className="mt-1 text-sm text-slate-500">{note}</div>
            </div>

            <button className="h-10 px-3 rounded-xl bg-white/70 border border-white/50 text-sm text-slate-700 hover:bg-white transition">
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}