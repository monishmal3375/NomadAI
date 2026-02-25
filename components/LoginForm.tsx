"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !pw.trim()) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password: pw,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else if (result?.ok) {
      router.push("/");
      router.refresh();
    } else {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="h-11 w-full rounded-2xl bg-white/70 border border-white/55 text-sm text-slate-900 hover:bg-white transition"
      >
        Continue with Google
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px bg-white/60 flex-1" />
        <div className="text-xs text-slate-500">or</div>
        <div className="h-px bg-white/60 flex-1" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm text-slate-600">Email</label>
          <input
            className="mt-1 w-full h-11 rounded-2xl bg-white/70 border border-white/45 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 rounded-xl bg-white/70 border border-white/45 text-xs text-slate-700 hover:bg-white transition"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-11 rounded-2xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-95 transition"
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
