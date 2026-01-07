"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastType = "success" | "info" | "error";

type ToastItem = {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
};

type ToastCtx = {
  toast: (t: Omit<ToastItem, "id">) => void;
};

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = (t: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    const item: ToastItem = { id, ...t };
    setItems((p) => [...p, item]);
    window.setTimeout(() => {
      setItems((p) => p.filter((x) => x.id !== id));
    }, 2600);
  };

  const value = useMemo(() => ({ toast }), []);

  return (
    <Ctx.Provider value={value}>
      {children}

      {/* toasts */}
      <div className="fixed right-5 top-5 z-[200] flex w-[340px] flex-col gap-3">
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="glass elevated-strong rounded-2xl border border-white/50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {t.title}
                  </div>
                  {t.message ? (
                    <div className="mt-1 text-sm text-slate-600">{t.message}</div>
                  ) : null}
                </div>
                <div
                  className={[
                    "mt-1 h-2.5 w-2.5 rounded-full",
                    t.type === "success" && "bg-emerald-500",
                    t.type === "info" && "bg-blue-500",
                    t.type === "error" && "bg-rose-500",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useToast must be used inside <ToastProvider />");
  return v;
}