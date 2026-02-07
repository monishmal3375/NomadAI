"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function SavedTripsDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[190]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <button
            aria-label="Close saved trips drawer"
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/25 backdrop-blur-sm"
          />

          {/* drawer */}
          <motion.aside
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-0 h-full w-[360px] max-w-[86vw] bg-white/80 border-r border-white/50 shadow-[0_18px_50px_rgba(15,23,42,0.18)]"
          >
            <div className="p-5 h-full flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-slate-900">
                    Saved trips
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    UI-only demo list.
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="h-10 w-10 rounded-2xl bg-white/70 border border-white/50 hover:bg-white transition grid place-items-center text-slate-700"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4">
                <input
                  placeholder="Search saved trips…"
                  className="w-full h-11 rounded-2xl bg-white/70 border border-white/55 px-4 text-sm outline-none text-slate-800 placeholder:text-slate-400"
                />
              </div>

              <div className="mt-4 flex-1 overflow-auto pr-1 space-y-3">
                <TripCard title="Chicago → New York" meta="3 days · $5000 · 2 people" />
                <TripCard title="Seattle → Vancouver" meta="2 days · $900 · 1 person" />
                <TripCard title="Austin → Toronto" meta="4 days · $2200 · 2 people" />
                <TripCard title="LA → Montreal" meta="5 days · $3100 · 3 people" />
              </div>

              <button className="mt-4 h-11 w-full rounded-2xl text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition">
                Create new trip
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TripCard({ title, meta }: { title: string; meta: string }) {
  return (
    <button className="w-full text-left rounded-3xl bg-white/70 border border-white/55 p-4 hover:bg-white transition">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{meta}</div>
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
        <span className="px-2 py-1 rounded-full bg-white/70 border border-white/50">
          View
        </span>
        <span className="px-2 py-1 rounded-full bg-white/70 border border-white/50">
          Duplicate
        </span>
        <span className="px-2 py-1 rounded-full bg-white/70 border border-white/50">
          Delete
        </span>
      </div>
    </button>
  );
}