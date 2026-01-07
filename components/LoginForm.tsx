"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !pw.trim()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    localStorage.setItem("nomadai_authed", "true");
    setLoading(false);

    router.replace("/");
  }

  return (
    <div className="space-y-4">
      {/* Social (fake) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          className="h-11 rounded-2xl bg-white/70 border border-white/45 text-sm font-medium text-slate-800 hover:bg-white transition"
          onClick={() => {
            localStorage.setItem("nomadai_authed", "true");
            router.replace("/");
          }}
        >
          Continue with Google
        </button>

        <button
          type="button"
          className="h-11 rounded-2xl bg-white/70 border border-white/45 text-sm font-medium text-slate-800 hover:bg-white transition"
          onClick={() => {
            localStorage.setItem("nomadai_authed", "true");
            router.replace("/");
          }}
        >
          Continue with Apple
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px bg-white/60 flex-1" />
        <div className="text-xs text-slate-500">or</div>
        <div className="h-px bg-white/60 flex-1" />
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-slate-600">Email</label>
          <input
            className="mt-1 w-full h-11 rounded-2xl bg-white/70 border border-white/45 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Password</label>
          <div className="mt-1 relative">
            <input
              className="w-full h-11 rounded-2xl bg-white/70 border border-white/45 px-4 pr-16 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="••••••••"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              type={show ? "text" : "password"}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 rounded-xl bg-white/70 border border-white/45 text-xs text-slate-700 hover:bg-white transition"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-11 rounded-2xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-95 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <button
          type="button"
          className="w-full h-11 rounded-2xl text-sm font-medium bg-white/70 border border-white/45 text-slate-800 hover:bg-white transition"
          onClick={() => {
            setEmail("demo@nomadai.com");
            setPw("demo1234");
          }}
        >
          Use demo credentials
        </button>
      </form>
    </div>
  );
}