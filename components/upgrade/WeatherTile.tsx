"use client";

import { useEffect, useMemo, useState } from "react";

type HourPoint = {
  iso: string;
  tempF?: number;
  precipProb?: number;
  code?: number;
};

type DayBlock = {
  dayLabel: string;
  dateLabel: string;
  points: HourPoint[];
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function wmoToIcon(code?: number) {
  if (code == null) return "⛅️";
  if (code === 0) return "☀️";
  if ([1, 2].includes(code)) return "🌤️";
  if (code === 3) return "☁️";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
  if ([61, 63, 65, 66, 67].includes(code)) return "🌧️";
  if ([71, 73, 75, 77].includes(code)) return "🌨️";
  if ([80, 81, 82].includes(code)) return "🌧️";
  if ([85, 86].includes(code)) return "🌨️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "⛅️";
}

function fmtDay(d: Date) {
  return new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(d);
}
function fmtDate(d: Date) {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(d);
}
function fmtHour(d: Date) {
  return new Intl.DateTimeFormat(undefined, { hour: "numeric" }).format(d);
}

async function geocodeOne(name: string) {
  const url =
    "https://geocoding-api.open-meteo.com/v1/search?" +
    new URLSearchParams({
      name,
      count: "1",
      language: "en",
      format: "json",
    }).toString();

  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  const first = data?.results?.[0];
  if (!first) return null;

  return {
    name: first.name as string,
    admin1: first.admin1 as string | undefined,
    country: first.country as string | undefined,
    latitude: first.latitude as number,
    longitude: first.longitude as number,
  };
}

async function fetchHourly(lat: number, lon: number, days: number) {
  const safeDays = clamp(days, 1, 16);
  const url =
    "https://api.open-meteo.com/v1/forecast?" +
    new URLSearchParams({
      latitude: String(lat),
      longitude: String(lon),
      hourly: "temperature_2m,precipitation_probability,weathercode",
      temperature_unit: "fahrenheit",
      timezone: "auto",
      forecast_days: String(safeDays),
    }).toString();

  const res = await fetch(url);
  if (!res.ok) throw new Error("Forecast failed");
  return (await res.json()) as any;
}

function groupIntoDays(payload: any, maxDays: number): DayBlock[] {
  const times: string[] = payload?.hourly?.time ?? [];
  const temps: number[] = payload?.hourly?.temperature_2m ?? [];
  const probs: number[] = payload?.hourly?.precipitation_probability ?? [];
  const codes: number[] = payload?.hourly?.weathercode ?? [];

  const byDate = new Map<string, HourPoint[]>();

  for (let i = 0; i < times.length; i++) {
    const iso = times[i];
    const d = new Date(iso);
    const key = d.toISOString().slice(0, 10); // YYYY-MM-DD (stable)
    const arr = byDate.get(key) ?? [];
    arr.push({
      iso,
      tempF: typeof temps[i] === "number" ? temps[i] : undefined,
      precipProb: typeof probs[i] === "number" ? probs[i] : undefined,
      code: typeof codes[i] === "number" ? codes[i] : undefined,
    });
    byDate.set(key, arr);
  }

  const keys = Array.from(byDate.keys()).sort().slice(0, maxDays);

  return keys.map((k) => {
    const d = new Date(k + "T12:00:00");
    return {
      dayLabel: fmtDay(d),
      dateLabel: fmtDate(d),
      points: byDate.get(k) ?? [],
    };
  });
}

export default function WeatherTile({
  destination,
  days,
}: {
  destination?: string;
  days?: number;
}) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<DayBlock[]>([]);

  // If days not provided, we still show forecast (default to 2 for UI),
  // BUT you asked: "if user specifies a few days, show all hours for that period".
  // So we clamp based on what *is* provided; otherwise a small UI default is fine.
  const effectiveDays = useMemo(() => clamp(days ?? 2, 1, 16), [days]);

  useEffect(() => {
    let alive = true;

    async function run() {
      if (!destination || !destination.trim()) {
        setBlocks([]);
        setPlace(null);
        setErr(null);
        return;
      }

      setLoading(true);
      setErr(null);

      try {
        const geo = await geocodeOne(destination.trim());
        if (!alive) return;

        if (!geo) {
          setBlocks([]);
          setPlace(null);
          setErr("Could not find that destination.");
          setLoading(false);
          return;
        }

        setPlace([geo.name, geo.admin1, geo.country].filter(Boolean).join(", "));

        const wx = await fetchHourly(geo.latitude, geo.longitude, effectiveDays);
        if (!alive) return;

        const grouped = groupIntoDays(wx, effectiveDays);
        setBlocks(grouped);
        setLoading(false);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? "Weather failed.");
        setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [destination, effectiveDays]);

  // Keep behavior consistent with your current StatsRail:
  // only show weather if intent.to exists (handled by parent).
  return (
    <div className="rounded-3xl glass elevated premium-hover p-5 h-full min-h-0 flex flex-col">
      <div className="shrink-0 flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">Weather</div>
          <div className="mt-1 text-sm text-slate-500">
            Hourly forecast · {effectiveDays} day{effectiveDays === 1 ? "" : "s"}
          </div>
        </div>
        <div className="h-10 w-10 rounded-2xl bg-white/70 border border-white/50 grid place-items-center">
          ☁️
        </div>
      </div>

      <div className="shrink-0 mt-3 text-sm text-slate-700">
        {place ? (
          <span className="text-slate-700">{place}</span>
        ) : (
          <span className="text-slate-500">{loading ? "Locating…" : destination}</span>
        )}
      </div>

      <div className="mt-4 flex-1 min-h-0 overflow-hidden">
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 w-[60%] rounded-xl bg-slate-900/10" />
            <div className="h-4 w-[80%] rounded-xl bg-slate-900/10" />
            <div className="h-4 w-[70%] rounded-xl bg-slate-900/10" />
          </div>
        ) : err ? (
          <div className="rounded-2xl bg-white/60 border border-white/45 p-4 text-sm text-slate-700">
            {err}
          </div>
        ) : blocks.length === 0 ? (
          <div className="rounded-2xl bg-white/60 border border-white/45 p-4 text-sm text-slate-600">
            No forecast available.
          </div>
        ) : (
          // (1) Days vertically
          <div className="h-full min-h-0 overflow-y-auto pr-1 space-y-3">
            {blocks.map((b) => (
              <div
                key={b.dayLabel + b.dateLabel}
                className="rounded-2xl bg-white/60 border border-white/45 p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <div className="text-sm font-semibold text-slate-900">
                      {b.dayLabel}
                    </div>
                    <div className="text-xs text-slate-500">{b.dateLabel}</div>
                  </div>
                  <div className="text-xs text-slate-500">{b.points.length} hrs</div>
                </div>

                {/* (2) Each day scrolls sideways */}
                <div className="mt-3 overflow-x-auto">
                  <div className="flex gap-2 w-max pb-1">
                    {b.points.map((p) => {
                      const d = new Date(p.iso);
                      const icon = wmoToIcon(p.code);
                      const temp = p.tempF != null ? Math.round(p.tempF) : null;
                      const pop = p.precipProb != null ? Math.round(p.precipProb) : null;

                      return (
                        <div
                          key={p.iso}
                          className="w-[92px] shrink-0 rounded-2xl bg-white/70 border border-white/50 px-3 py-2"
                        >
                          <div className="text-[11px] text-slate-500">{fmtHour(d)}</div>
                          <div className="mt-1 flex items-center justify-between">
                            <div className="text-lg">{icon}</div>
                            <div className="text-sm font-semibold text-slate-900">
                              {temp != null ? `${temp}°` : "—"}
                            </div>
                          </div>
                          <div className="mt-1 text-[11px] text-slate-500">
                            {pop != null ? `Rain ${pop}%` : " "}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-slate-500">
                  Scroll sideways to see all hours →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}