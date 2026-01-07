"use client";

import ChatPanel from "../ChatPanel";
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
    <section className="h-full min-h-0 min-w-0 flex flex-col gap-4">
      {/* pinned tabs */}
      <div className="shrink-0">
        <DayTabs days={days} selected={day} onSelect={onSelectDay} />
      </div>

      {/* scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-4">
        <ChatPanel />
        <ItineraryTimeline day={day} />
      </div>
    </section>
  );
}