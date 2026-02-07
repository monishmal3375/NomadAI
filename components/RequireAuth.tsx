"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession(); // "loading" | "authenticated" | "unauthenticated"

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="rounded-3xl glass elevated px-6 py-5">
          <div className="text-slate-900 font-semibold">Loading…</div>
          <div className="text-slate-500 text-sm mt-1">Checking session</div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    // While redirecting
    return null;
  }

  return <>{children}</>;
}