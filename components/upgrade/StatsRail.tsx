"use client";

import IntentCard, { Intent } from "../IntentCard";
import StatsPanel from "../StatsPanel";
import WeatherTile from "./WeatherTile"; // ✅ NEW

type Country = "US" | "CA" | "UNKNOWN";

function norm(s?: string) {
  return (s ?? "").trim().toLowerCase();
}

function detectCountry(place?: string): Country {
  const t = norm(place);
  if (!t) return "UNKNOWN";

  const canadaHints = [
    "canada",
    "toronto",
    "vancouver",
    "montreal",
    "calgary",
    "ottawa",
    "edmonton",
    "winnipeg",
    "quebec",
    "ontario",
    "alberta",
    "british columbia",
  ];
  if (canadaHints.some((h) => t.includes(h))) return "CA";

  const usHints = ["usa", "united states", "chicago", "new york", "nyc"];
  if (usHints.some((h) => t.includes(h))) return "US";

  // For your scope, default unknowns to US
  return "US";
}

function money(n: number, currency: "USD" | "CAD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);
}

export default function StatsRail({
  intent,
  onOpenExport,
}: {
  intent: Intent;
  onOpenExport: () => void;
}) {
  const fromC = detectCountry(intent.from);
  const toC = detectCountry(intent.to);

  const countriesDifferent =
    fromC !== "UNKNOWN" && toC !== "UNKNOWN" && fromC !== toC;

  // RULE #2: Daily target only if days present AND budget present
  const showDailyTarget =
    typeof intent.days === "number" &&
    intent.days > 0 &&
    typeof intent.budget === "number" &&
    intent.budget > 0;

  // RULE #3: Currency tile:
  // - show only if countries different
  // - show conversion amount only if budget exists
  const showCurrencyTile = countriesDifferent;

  const fxRate = fromC === "US" && toC === "CA" ? 1.35 : 0.74; // demo
  const fromCurrency: "USD" | "CAD" = fromC === "CA" ? "CAD" : "USD";
  const toCurrency: "USD" | "CAD" = toC === "CA" ? "CAD" : "USD";

  const converted =
    typeof intent.budget === "number" ? Math.round(intent.budget * fxRate) : undefined;

  return (
    <section className="h-full min-h-0 min-w-0 flex flex-col gap-6">
      {/* RULE #1: Trip summary shows only what was actually extracted */}
      <IntentCard intent={intent} />

      <div className="flex-1 min-h-0 overflow-auto pr-1 space-y-6">
        {/* Daily target */}
        {showDailyTarget ? (
          <StatsPanel budget={intent.budget!} days={intent.days!} to={intent.to} />
        ) : null}

        {/* Currency conversion (rate-only if no budget) */}
        {showCurrencyTile ? (
          <div className="rounded-3xl glass elevated premium-hover p-5">
            <div className="text-sm font-semibold text-slate-900">Currency</div>
            <div className="mt-1 text-sm text-slate-500">
              {fromCurrency} → {toCurrency}
            </div>

            <div className="mt-4 text-sm text-slate-700">
              1 {fromCurrency} ≈ <span className="font-semibold">{fxRate}</span> {toCurrency}{" "}
              <span className="text-xs text-slate-500">(demo)</span>
            </div>

            {typeof intent.budget === "number" ? (
              <div className="mt-4 rounded-2xl bg-white/60 border border-white/45 p-3">
                <div className="flex items-baseline justify-between">
                  <div className="text-sm text-slate-600">Your budget</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {money(intent.budget, fromCurrency)}
                  </div>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <div className="text-sm text-slate-600">Approx.</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {converted ? money(converted, toCurrency) : "—"}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-3 text-xs text-slate-500">
                Add a budget to see the converted amount.
              </div>
            )}
          </div>
        ) : null}

        {/* ✅ Weather tile (NEW UI) */}
        {intent.to ? (
          <WeatherTile destination={intent.to} days={intent.days} />
        ) : null}

        {/* Export tile */}
        <div className="rounded-3xl glass elevated premium-hover p-5">
          <div className="text-sm font-semibold text-slate-900">Export</div>
          <div className="mt-1 text-sm text-slate-500">
            Download or send to email (UI demo).
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