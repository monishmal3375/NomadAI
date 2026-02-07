"use client";

export type Intent = {
  from?: string;
  to?: string;
  days?: number;
  budget?: number;
  people?: number;
  prefs?: string[];
};

function fmtMoney(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export default function IntentCard({ intent }: { intent: Intent }) {
  // Only show pills for fields that exist
  const pills = [
    intent.from ? `From: ${intent.from}` : null,
    intent.to ? `To: ${intent.to}` : null,
    typeof intent.days === "number" ? `${intent.days} days` : null,
    typeof intent.people === "number" ? `${intent.people} people` : null,
    typeof intent.budget === "number" ? `Budget: ${fmtMoney(intent.budget)}` : null,
  ].filter(Boolean) as string[];

  return (
    <div className="rounded-3xl glass elevated premium-hover p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">Trip summary</div>
          <div className="mt-1 text-sm text-slate-500">
            Shows only what the user provided (UI demo).
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
          <span className="text-sm text-slate-500">
            Run a plan to see extracted details.
          </span>
        )}
      </div>

      {intent.prefs?.length ? (
        <div className="mt-4 text-sm text-slate-700">
          Preferences:{" "}
          <span className="text-slate-500">{intent.prefs.join(", ")}</span>
        </div>
      ) : null}
    </div>
  );
}