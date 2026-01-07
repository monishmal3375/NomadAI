"use client";

export type Intent = {
  from?: string;
  to?: string;
  days?: number;
  budget?: number;
  people?: number;

  // support both names so old/new code won't break
  preferences?: string[];
  prefs?: string[];
};

export default function IntentCard({ intent }: { intent: Intent }) {
  const prefs = intent.preferences ?? intent.prefs ?? [];

  const pills = [
    intent.from && `From: ${intent.from}`,
    intent.to && `To: ${intent.to}`,
    intent.days && `${intent.days} days`,
    intent.people && `${intent.people} people`,
    typeof intent.budget === "number" && `$${intent.budget.toLocaleString()}`,
  ].filter(Boolean) as string[];

  return (
    <div className="rounded-3xl glass elevated premium-hover p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">Trip summary</div>
          <div className="mt-1 text-sm text-slate-500">
            What NomadAI understood (UI-only).
          </div>
        </div>

        <div className="h-10 w-10 rounded-2xl bg-white/70 border border-white/50 grid place-items-center">
          ✦
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {pills.length ? (
          pills.map((p) => (
            <span
              key={p}
              className="text-xs px-2.5 py-1.5 rounded-full bg-white/70 border border-white/50 text-slate-700"
            >
              {p}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-500">Run a plan to see extracted details.</span>
        )}
      </div>

      {prefs.length ? (
        <div className="mt-4">
          <div className="text-xs text-slate-500">Preferences</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {prefs.map((p) => (
              <span
                key={p}
                className="text-xs px-2.5 py-1.5 rounded-full bg-white/60 border border-white/45 text-slate-700"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}