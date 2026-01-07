"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function ExportModal({
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
          className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <button
            aria-label="Close export modal"
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
          />

          {/* modal */}
          <motion.div
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-lg rounded-[28px] bg-white/80 border border-white/50 shadow-[0_18px_50px_rgba(15,23,42,0.18)] overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-slate-900">
                    Export itinerary
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    UI-only demo: choose an export format.
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

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button className="rounded-2xl bg-white/70 border border-white/55 p-4 text-left hover:bg-white transition">
                  <div className="text-sm font-semibold text-slate-900">
                    Download PDF
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Save to your device.
                  </div>
                </button>

                <button className="rounded-2xl bg-white/70 border border-white/55 p-4 text-left hover:bg-white transition">
                  <div className="text-sm font-semibold text-slate-900">
                    Send to email
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Email a copy (UI demo).
                  </div>
                </button>
              </div>

              <div className="mt-5 rounded-2xl bg-white/60 border border-white/45 p-4">
                <div className="text-sm font-semibold text-slate-900">
                  Export options
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Include map</Pill>
                  <Pill>Include budget</Pill>
                  <Pill>Include weather</Pill>
                  <Pill>Compact layout</Pill>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={onClose}
                  className="h-11 px-5 rounded-2xl bg-white/70 border border-white/55 text-sm font-medium text-slate-800 hover:bg-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={onClose}
                  className="h-11 px-5 rounded-2xl text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-2.5 py-1.5 rounded-full bg-white/70 border border-white/50 text-slate-700">
      {children}
    </span>
  );
}