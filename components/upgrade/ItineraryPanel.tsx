"use client";

import DayTabs from "../DayTabs";

type ItineraryItem = {
  time: string;
  period: "morning" | "afternoon" | "evening" | "night";
  activity: string;
  location: string;
  detail: string;
  indoor?: boolean;
  estCost?: number;
};

type ItineraryDict = Record<string, ItineraryItem[]>;

export default function ItineraryPanel({
  day,
  days,
  onSelectDay,
  itinerary,
}: {
  day: number;
  days: number;
  onSelectDay: (d: number) => void;
  itinerary: ItineraryDict;
}) {
  const key = String(day);
  const items = itinerary?.[key] ?? [];

  return (
    <section className="h-full min-h-0 min-w-0 flex flex-col gap-4">
      {/* pinned tabs */}
      <div className="shrink-0">
        <DayTabs days={days} selected={day} onSelect={onSelectDay} />
      </div>

      {/* scrollable planner */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3">
        {items.length === 0 ? (
          <div className="rounded-3xl glass elevated p-5">
            <div className="text-sm font-semibold text-slate-900">Day plan</div>
            <div className="mt-1 text-sm text-slate-500">
              No itinerary items yet. Build itinerary to generate this day plan.
            </div>
          </div>
        ) : (
          items.map((it, idx) => (
            <div
              key={`${it.time}-${idx}`}
              className="rounded-3xl glass elevated premium-hover p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-500">
                    {it.period.toUpperCase()} • {it.time}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {it.activity}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    {it.location}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {typeof it.estCost === "number" ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-white/70 border border-white/50 text-slate-700">
                      ~${it.estCost}
                    </span>
                  ) : null}

                  {typeof it.indoor === "boolean" ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-white/70 border border-white/50 text-slate-700">
                      {it.indoor ? "Indoor" : "Outdoor"}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="mt-3 text-sm text-slate-700 leading-relaxed">
                {it.detail}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}