"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close modal backdrop"
            className="fixed inset-0 z-[160] bg-slate-950/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed left-1/2 top-1/2 z-[170] w-[92vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="glass elevated-strong rounded-3xl border border-white/55 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <div className="text-lg font-semibold text-slate-900">{title}</div>
                  <div className="text-sm text-slate-500">UI demo — wire logic later.</div>
                </div>
                <button
                  onClick={onClose}
                  className="h-10 w-10 rounded-2xl bg-white/70 border border-white/50 hover:bg-white transition grid place-items-center"
                >
                  ✕
                </button>
              </div>
              <div className="px-6 pb-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}