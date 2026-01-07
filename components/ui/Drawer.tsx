"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[999]">
          <motion.div
            className="absolute inset-0 bg-black/30"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="absolute right-0 top-0 h-full w-[420px] bg-white/80 backdrop-blur border-l border-white/50 shadow-2xl"
            initial={{ x: 40 }}
            animate={{ x: 0 }}
            exit={{ x: 40 }}
          >
            <div className="p-5 border-b border-white/40 font-semibold">
              {title}
            </div>
            <div className="p-5">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
