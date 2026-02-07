"use client";

export default function StatsPanel({
  budget,
  days,
  to,
}: {
  budget: number;
  days: number;
  to?: string;
}) {
  const perDay = days > 0 ? Math.round(budget / days) : 0;

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="rounded-3xl glass elevated premium-hover p-5">
      <div className="text-sm font-semibold text-slate-900">Daily target</div>
      <div className="mt-1 text-sm text-slate-500">
        {to ? (
          <>
            Budget split for <span className="text-slate-700">{to}</span>
          </>
        ) : (
          "Budget split"
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div className="text-sm text-slate-600">Per day</div>
        <div className="text-2xl font-semibold text-slate-900">
          {money.format(perDay)}
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-500">
        Based on {money.format(budget)} over {days} day{days === 1 ? "" : "s"}.
      </div>
    </div>
  );
}