"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "./Sidebar";

import MapWrapper from "./upgrade/MapWrapper";
import ItineraryPanel from "./upgrade/ItineraryPanel";
import StatsRail from "./upgrade/StatsRail";

import ExportModal from "./upgrade/ExportModal";
import SavedTripsDrawer from "./upgrade/SavedTripsDrawer";

import type { Intent } from "./IntentCard";

type Phase = "welcome" | "generating" | "results";

const DEFAULT_INTENT: Intent = {
  from: "Chicago",
  to: "New York",
  days: 3,
  people: 2,
  budget: 5000,
  // IMPORTANT: IntentCard uses `prefs`, so keep this name
  prefs: ["museums", "food", "night views"],
};

export default function AppShell() {
  const [phase, setPhase] = useState<Phase>("welcome");// change to "welcome" if you want
  const [prompt, setPrompt] = useState("");

  const [day, setDay] = useState(1);
  const [days] = useState(3);

  const [intent] = useState<Intent>(DEFAULT_INTENT);

  const [exportOpen, setExportOpen] = useState(false);
  const [savedTripsOpen, setSavedTripsOpen] = useState(false);

  const canPlan = useMemo(() => prompt.trim().length > 0, [prompt]);

  async function onPlan() {
    if (!canPlan) return;
    setPhase("generating");

    await wait(700);
    await wait(900);
    await wait(900);
    await wait(650);

    setPhase("results");
  }

  return (
    // KEY: lock the entire app to viewport height and stop body scrolling
    <div className="h-screen overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-6 py-6 h-full flex flex-col">
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
        {/* KEY: flex-1 + min-h-0 allows children to be scroll containers */}
        <div className="flex-1 min-h-0 flex gap-6">
          <Sidebar />

          {/* KEY: overflow-hidden so NOTHING creates page scroll */}
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
                    <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/50 blur-3xl" />
                    <div className="absolute top-24 -right-32 h-96 w-96 rounded-full bg-white/35 blur-3xl" />
                    <div className="absolute bottom-[-120px] left-40 h-[520px] w-[520px] rounded-full bg-white/25 blur-3xl" />
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
                          placeholder='Example: "Chicago to New York for 3 days, budget $5000. I like museums, food, and night views."'
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          onKeyDown={(e) => {
                            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") onPlan();
                          }}
                        />

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

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <MiniCard title="Weather-aware" desc="Indoor backups if it rains." />
                        <MiniCard title="Budget synced" desc="Local currency conversion." />
                        <MiniCard title="Time-blocked plan" desc="Morning → night schedule." />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* GENERATING */}
              {phase === "generating" && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="h-full relative overflow-hidden"
                >
                  <div className="h-full grid grid-cols-12 gap-6 opacity-60 blur-[0.2px] min-w-0">
                    <div className="col-span-6 rounded-3xl glass elevated p-6 relative overflow-hidden">
                      <div className="text-sm text-slate-500">Generating route</div>
                      <div className="mt-2 text-2xl font-semibold text-slate-900">
                        Building your plan…
                      </div>

                      <div className="mt-6 space-y-3">
                        <SkeletonLine />
                        <SkeletonLine />
                        <SkeletonLine />
                      </div>

                      <div className="absolute inset-0 opacity-40 pointer-events-none">
                        <div className="absolute inset-0 shimmer" />
                      </div>
                    </div>

                    <div className="col-span-4 rounded-3xl glass elevated p-6 relative overflow-hidden">
                      <div className="text-lg font-semibold text-slate-900">NomadAI</div>
                      <div className="text-sm text-slate-500">Trip planning chat</div>

                      <div className="mt-6 space-y-4">
                        <SkeletonBubble />
                        <SkeletonBubble />
                        <SkeletonBubble />
                      </div>

                      <div className="absolute inset-0 opacity-40 pointer-events-none">
                        <div className="absolute inset-0 shimmer" />
                      </div>
                    </div>

                    <div className="col-span-2 space-y-6">
                      <div className="rounded-3xl glass elevated p-5 relative overflow-hidden">
                        <SkeletonLine />
                        <div className="mt-3 h-8 w-24 rounded-xl bg-slate-900/10" />
                        <div className="absolute inset-0 opacity-40 pointer-events-none">
                          <div className="absolute inset-0 shimmer" />
                        </div>
                      </div>

                      <div className="rounded-3xl glass elevated p-5 relative overflow-hidden">
                        <SkeletonLine />
                        <div className="mt-3 h-8 w-20 rounded-xl bg-slate-900/10" />
                        <div className="absolute inset-0 opacity-40 pointer-events-none">
                          <div className="absolute inset-0 shimmer" />
                        </div>
                      </div>

                      <div className="rounded-3xl glass elevated p-5 relative overflow-hidden">
                        <SkeletonLine />
                        <div className="mt-3 h-8 w-28 rounded-xl bg-slate-900/10" />
                        <div className="absolute inset-0 opacity-40 pointer-events-none">
                          <div className="absolute inset-0 shimmer" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="w-full max-w-xl rounded-[28px] bg-white/70 border border-white/50 elevated p-6 relative overflow-hidden">
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
                              Building a weather-aware, budget-synced itinerary.
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 space-y-3">
                          <ThinkingRow text="Extracting intent from your request" />
                          <ThinkingRow text="Fetching weather forecast + best timing" />
                          <ThinkingRow text="Converting budget to local currency" />
                          <ThinkingRow text="Generating day-by-day plan" />
                          <ThinkingRow text="Rendering map + itinerary cards" />
                        </div>

                        <div className="mt-5 text-xs text-slate-600">
                          Real API calls may take a few seconds — this keeps the experience premium.
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* RESULTS */}
              {phase === "results" && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="h-full min-h-0 grid grid-cols-12 gap-6 min-w-0"
                >
                  {/* Map column */}
                  <div className="col-span-6 h-full min-h-0 min-w-0 overflow-hidden">
                    <MapWrapper onOpenTrips={() => setSavedTripsOpen(true)} />
                  </div>

                  {/* Center column */}
                  <div className="col-span-4 h-full min-h-0 min-w-0 overflow-hidden">
                    <ItineraryPanel day={day} days={days} onSelectDay={setDay} />
                  </div>

                  {/* Right column */}
                  <div className="col-span-2 h-full min-h-0 min-w-0 overflow-hidden">
                    <StatsRail intent={intent} onOpenExport={() => setExportOpen(true)} />
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

function MiniCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white/60 border border-white/45 p-4">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </div>
  );
}

function ThinkingRow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/90 shadow-[0_0_14px_rgba(16,185,129,0.45)]" />
      <div className="text-sm text-slate-700">{text}</div>
      <div className="ml-auto h-2 w-24 rounded-full bg-slate-900/10 overflow-hidden">
        <div className="h-full w-1/2 shimmer opacity-70" />
      </div>
    </div>
  );
}

function SkeletonLine() {
  return <div className="h-4 w-full rounded-xl bg-slate-900/10" />;
}

function SkeletonBubble() {
  return (
    <div className="rounded-2xl bg-white/70 border border-white/45 p-4">
      <div className="h-4 w-[80%] rounded-xl bg-slate-900/10" />
      <div className="mt-3 h-4 w-[60%] rounded-xl bg-slate-900/10" />
    </div>
  );
}