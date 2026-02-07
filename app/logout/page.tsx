"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("nomadai_authed");
    router.replace("/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="rounded-3xl glass elevated px-6 py-5">
        <div className="text-slate-900 font-semibold">Logging out…</div>
        <div className="text-slate-500 text-sm mt-1">Redirecting</div>
      </div>
    </div>
  );
}