"use client";

import DayTabs from "../DayTabs";
import ItineraryTimeline from "../ItineraryTimeline";

export default function ItineraryPanel({
  day,
  days,
  onSelectDay,
}: {
  day: number;
  days: number;
  onSelectDay: (d: number) => void;
}) {
  return (
    <section className="h-full min-h-0 min-w-0 rounded-3xl glass elevated overflow-hidden flex flex-col">
      {/* Header / Tabs (pinned) */}
      <div className="shrink-0 px-4 pt-4 pb-3 border-b border-white/45">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">Day planner</div>
            <div className="text-xs text-slate-500">Timeline for your itinerary</div>
          </div>
        </div>

        <div className="mt-3">
          <DayTabs days={days} selected={day} onSelect={onSelectDay} />
        </div>
      </div>

      {/* Timeline (scrollable) */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
        <ItineraryTimeline day={day} />
      </div>
    </section>
  );
}