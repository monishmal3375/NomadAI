"use client";

import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="w-full h-11 rounded-2xl bg-white/80 border border-white/50 text-slate-800 hover:bg-white transition"
    >
      Continue with Google
    </button>
  );
}
