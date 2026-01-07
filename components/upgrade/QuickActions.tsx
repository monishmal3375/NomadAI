"use client";

const ACTIONS = [
  { label: "Make it cheaper", add: " Make it cheaper and include free activities." },
  { label: "More nightlife", add: " Add nightlife and late-night food spots." },
  { label: "More museums", add: " Focus more on museums and art." },
  { label: "Add one day", add: " Add one more day and spread the plan." },
  { label: "Kid-friendly", add: " Make it kid-friendly and avoid long walks." },
];

export default function QuickActions({
  onAction,
}: {
  onAction: (textToAppend: string) => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {ACTIONS.map((a) => (
        <button
          key={a.label}
          onClick={() => onAction(a.add)}
          className="text-xs px-3 py-2 rounded-full bg-white/60 border border-white/50 text-slate-700 hover:bg-white/80 transition"
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}