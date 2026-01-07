"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ok = localStorage.getItem("nomadai_authed") === "true";
    if (!ok) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="rounded-3xl glass elevated px-6 py-5">
          <div className="text-slate-900 font-semibold">Loading…</div>
          <div className="text-slate-500 text-sm mt-1">Checking session</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}