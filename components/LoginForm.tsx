"use client";

import { signIn } from "next-auth/react";

export default function LoginForm() {
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="h-11 w-full rounded-2xl bg-white/70 border border-white/55 text-sm text-slate-900 hover:bg-white transition"
      >
        Continue with Google
      </button>

      <div className="text-center text-xs text-slate-500">or</div>

      <div className="rounded-2xl bg-white/60 border border-white/45 p-3 text-sm text-slate-600">
        Email login is UI-only for now. Use Google sign-in above.
      </div>
    </div>
  );
}