"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "./Sidebar";

import MapWrapper from "./upgrade/MapWrapper";
import ItineraryPanel from "./upgrade/ItineraryPanel";
import StatsRail from "./upgrade/StatsRail";

import ChatPanel from "./ChatPanel";

import ExportModal from "./upgrade/ExportModal";
import SavedTripsDrawer from "./upgrade/SavedTripsDrawer";

import type { Intent } from "./IntentCard";

type Phase = "welcome" | "generating" | "results";

// IMPORTANT: no defaults
const DEFAULT_INTENT: Intent = {};


export default function AppShell() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [prompt, setPrompt] = useState("");

  const [day, setDay] = useState(1);

  const [intent, setIntent] = useState<Intent>(DEFAULT_INTENT);

  const [exportOpen, setExportOpen] = useState(false);
  const [savedTripsOpen, setSavedTripsOpen] = useState(false);

  const [planError, setPlanError] = useState<string | null>(null);

  const canPlan = useMemo(() => prompt.trim().length > 0, [prompt]);
  const [itinerary, setItinerary] = useState<Record<string, any[]>>({});
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatSending, setChatSending] = useState(false);
  

  async function onChatSend(text: string) {
      setChatMessages((m) => [...m, { role: "user", content: text }]);
      setChatSending(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            context: {
              intent,
              weather:"",
              itinerary: itinerary,
            },
          }),
        });

        const data = await res.json();

        const reply = typeof data.reply === "string" ? data.reply : "…";
        setChatMessages((m) => [...m, { role: "assistant", content: reply }]);

        // If AI decides it needs to update itinerary
        if (data.itineraryPatch && typeof data.itineraryPatch === "object") {
          console.log("Applying itinerary patch from AI:", data.itineraryPatch);
          setItinerary((prev: any) => ({
            ...prev,
            ...data.itineraryPatch, // simple merge
          }));
        }
      } catch {
        setChatMessages((m) => [
          ...m,
          { role: "assistant", content: "Something went wrong calling the AI." },
        ]);
      } finally {
        setChatSending(false);
      }
    }
  async function onPlan() {
    if (!canPlan) return;

    setPlanError(null);
    setPhase("generating");

    try {
      // ✅ Use your server API (OpenAI-backed) to extract intent
      const res = await fetch("/api/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      console.log("Intent API response status:", res.status);
      

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Intent API failed (${res.status})`);
      }

      const data = (await res.json()) as { intent?: Intent };
console.log("Intent API response data:", data);
      if (!data?.intent) {
        throw new Error("Intent API returned no intent.");
      }

      setIntent(data.intent);
      // after you setIntent(extracted)
      const itinRes = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: data.intent,
          weatherByDay: null, // later you can pass real weather data
        }),
      });
      if (itinRes.ok) {
        const itinData = await itinRes.json();
        setItinerary(itinData.itinerary ?? {});
      } else {
        setItinerary({});
      }

      // Simulated latency (keep your premium feel)
      await wait(700);
      await wait(900);
      await wait(650);

      setPhase("results");
    } catch (e: any) {
      // Fallback: keep app usable even if API fails
      console.error(e);
      setPlanError(e?.message ?? "Failed to extract intent.");
      setIntent(extractIntentFallback(prompt));
      setPhase("results");
    }
  }

  return (
    <div className="h-screen overflow-hidden">
      <div className="w-full px-6 py-6 h-full flex flex-col">
        {/* Top bar */}
        <header className="shrink-0 mb-6 flex items-center justify-between relative z-50">
          <div>
            <div className="text-sm text-slate-500">NomadAI</div>
            <div className="text-2xl font-semibold text-slate-900 leading-tight">
              Intelligent Itinerary Orchestrator
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-2xl glass elevated px-3 h-11">
              <div className="h-9 w-9 rounded-xl bg-slate-900/5 border border-white/40" />
              <input
                className="w-[260px] bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                placeholder="Search trips, cities, saved plans…"
              />
            </div>

            <a
              href="/logout"
              className="h-11 px-4 rounded-2xl text-sm font-medium bg-white/70 border border-white/40 text-slate-800 hover:bg-white transition"
            >
              Logout
            </a>

            <div className="h-11 w-11 rounded-2xl glass elevated flex items-center justify-center">
              <div className="h-7 w-7 rounded-full bg-slate-900/15" />
            </div>
          </div>
        </header>

        {/* Main layout */}
        <div className="flex-1 min-h-0 flex gap-6">
          <Sidebar />

          <main className="flex-1 min-w-0 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {/* WELCOME */}
              {phase === "welcome" && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                  className="h-full rounded-3xl glass elevated relative overflow-hidden"
                >
                  <div className="absolute inset-0 noise">
                    <div className="aurora" />
                    <div className="absolute inset-0 grid-fade" />
                  </div>

                  <div className="relative h-full p-10 flex items-center justify-center">
                    <div className="w-full max-w-3xl">
                      <div className="flex items-center justify-between gap-6">
                        <div>
                          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-white/45 px-3 py-1 text-xs text-slate-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Live planning · weather + budget + currency
                          </div>

                          <h1 className="mt-4 text-5xl font-semibold text-slate-900 leading-[1.05]">
                            Describe your trip.
                            <span className="block text-slate-500 text-2xl font-medium mt-3">
                              I’ll generate a route, schedule, and a budget-aware plan.
                            </span>
                          </h1>
                        </div>

                        <div className="hidden md:flex items-center justify-center">
                          <div className="h-20 w-20 rounded-3xl border border-white/50 bg-white/60 shadow-sm flex items-center justify-center">
                            <div className="h-12 w-12 rounded-2xl ai-orb" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 rounded-[28px] bg-white/70 border border-white/50 elevated p-5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Trip request</div>
                          <div className="text-xs text-slate-500 hidden sm:block">
                            Press{" "}
                            <span className="px-2 py-1 rounded-lg bg-white/70 border border-white/45">
                              ⌘
                            </span>{" "}
                            +{" "}
                            <span className="px-2 py-1 rounded-lg bg-white/70 border border-white/45">
                              Enter
                            </span>{" "}
                            to run
                          </div>
                        </div>

                        <textarea
                          className="mt-3 w-full h-28 resize-none bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-[15px] leading-relaxed"
                          placeholder='Example: "From Chicago to New York, 4 people, 4 days, $3000 budget."'
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          onKeyDown={(e) => {
                            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") onPlan();
                          }}
                        />

                        {planError ? (
                          <div className="mt-3 text-xs text-rose-600">
                            {planError}
                          </div>
                        ) : null}

                        <div className="mt-5 flex items-center justify-between">
                          <div className="text-xs text-slate-600">
                            Tip: add dates for exact weather + costs.
                          </div>

                          <button
                            onClick={onPlan}
                            disabled={!canPlan}
                            className="h-11 px-6 rounded-2xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 shadow-sm hover:opacity-95 transition disabled:opacity-50"
                          >
                            Build itinerary
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* GENERATING popup */}
              {phase === "generating" && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="h-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-3xl glass elevated" />

                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="w-full max-w-2xl rounded-[28px] bg-white/70 border border-white/50 elevated p-6 relative overflow-hidden">
                      <div className="absolute inset-0 noise">
                        <div className="aurora" />
                        <div className="absolute inset-0 grid-fade opacity-40" />
                      </div>

                      <div className="relative">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-2xl border border-white/50 bg-white/70 shadow-sm flex items-center justify-center">
                            <div className="h-9 w-9 rounded-xl ai-orb" />
                          </div>

                          <div>
                            <div className="text-lg font-semibold text-slate-900">
                              NomadAI is thinking…
                            </div>
                            <div className="text-sm text-slate-600">
                              Extracting intent with AI (OpenAI).
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 space-y-3">
                          <ThinkingRow text="Extracting trip details" />
                          <ThinkingRow text="Preparing map route" />
                          <ThinkingRow text="Preparing itinerary layout" />
                          <ThinkingRow text="Preparing summary tiles" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* RESULTS: 4 columns */}
              {phase === "results" && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="h-full min-h-0 grid grid-cols-12 gap-6 min-w-0"
                >
                  {/* 1) Map */}
                  <div className="col-span-4 h-full min-h-0 min-w-0 overflow-hidden">
                    <MapWrapper onOpenTrips={() => setSavedTripsOpen(true)} intent={intent} />
                  </div>

                  {/* 2) Chat */}
                  <div className="col-span-3 h-full min-h-0 min-w-0 overflow-hidden">
                    <div className="h-full min-h-0 rounded-3xl glass elevated overflow-hidden flex flex-col">
                      <div className="flex-1 min-h-0 overflow-auto">
                        <ChatPanel
                          messages={chatMessages}
                          onSend={onChatSend}
                          isSending={chatSending}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3) Day planner */}
                  <div className="col-span-3 h-full min-h-0 min-w-0 overflow-hidden">
                    <div className="h-full min-h-0 overflow-auto">
                      {/* if user didn't specify days, pass 1 so tabs don't look weird */}
                      {/* <ItineraryPanel day={day} days={intent.days ?? 1} onSelectDay={setDay} /> */}
                      <ItineraryPanel
                        day={day}
                        days={intent.days ?? 1}
                        onSelectDay={setDay}
                        itinerary={itinerary}
                      />
                    </div>
                  </div>

                  {/* 4) Stats */}
                  <div className="col-span-2 h-full min-h-0 min-w-0 overflow-hidden">
                    <div className="h-full min-h-0 overflow-auto">
                      <StatsRail intent={intent} onOpenExport={() => setExportOpen(true)} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Overlays */}
      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
      <SavedTripsDrawer open={savedTripsOpen} onClose={() => setSavedTripsOpen(false)} />
    </div>
  );
}

/* ---------- helpers ---------- */

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function ThinkingRow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/90 shadow-[0_0_14px_rgba(16,185,129,0.45)]" />
      <div className="text-sm text-slate-700">{text}</div>
      <div className="ml-auto h-2 w-28 rounded-full bg-slate-900/10 overflow-hidden">
        <div className="h-full w-1/2 shimmer opacity-70" />
      </div>
    </div>
  );
}

/**
 * Fallback extractor (ONLY used if your /api/intent fails)
 */
function extractIntentFallback(text: string): Intent {
  const t = text.trim();
  const out: Intent = {};

  const ft = t.match(/from\s+(.+?)\s+to\s+(.+?)(?:[.,]|$)/i);
  if (ft) {
    out.from = cleanPlace(ft[1]);
    out.to = cleanPlace(ft[2]);
  } else {
    const simple = t.match(/(.+?)\s+to\s+(.+?)(?:[.,]|$)/i);
    if (simple) {
      out.from = cleanPlace(simple[1]);
      out.to = cleanPlace(simple[2]);
    }
  }

  const days = t.match(/(\d+)\s*(day|days)\b/i);
  if (days) out.days = clampInt(days[1], 1, 30);

  const people =
    t.match(/(\d+)\s*(people|persons|travelers|travellers)\b/i) ||
    t.match(/family\s+of\s+(\d+)\b/i);
  if (people) out.people = clampInt(people[1], 1, 20);

  const budget =
    t.match(/\$\s*([0-9,]+)\b/) || t.match(/([0-9,]+)\s*(usd|dollars?)\b/i);
  if (budget) out.budget = clampMoney(budget[1]);

  return out;
}

function cleanPlace(s: string) {
  return s.replace(/\s+/g, " ").replace(/["']/g, "").trim();
}

function clampInt(n: string, min: number, max: number) {
  const v = Math.max(min, Math.min(max, parseInt(n, 10)));
  return Number.isFinite(v) ? v : undefined;
}

function clampMoney(n: string) {
  const v = parseInt(n.replace(/,/g, ""), 10);
  if (!Number.isFinite(v) || v <= 0) return undefined;
  return v;
}