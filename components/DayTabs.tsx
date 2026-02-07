"use client";

export default function DayTabs({
  days,
  selected,
  onSelect,
}: {
  days: number;
  selected: number;
  onSelect: (d: number) => void;
}) {
  const arr = Array.from({ length: Math.max(days, 3) }).map((_, i) => i + 1);

  return (
    <div className="inline-flex rounded-2xl bg-white/60 border border-white/50 p-1">
      {arr.map((d) => {
        const active = d === selected;
        return (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className={[
              "h-9 px-4 rounded-xl text-sm font-medium transition",
              active
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-700 hover:bg-white/70",
            ].join(" ")}
          >
            Day {d}
          </button>
        );
      })}
    </div>
  );
}