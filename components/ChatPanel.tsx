"use client";

import { useRef, useState } from "react";

export type ChatMsg = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPanel({
  messages,
  onSend,
  isSending,
}: {
  messages: ChatMsg[];
  onSend: (text: string) => void;
  isSending?: boolean;
}) {
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  function send() {
    const t = text.trim();
    if (!t || isSending) return;
    setText("");
    onSend(t);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
  }

  return (
    <div className="h-full min-h-0 rounded-3xl glass elevated overflow-hidden flex flex-col">
      <div className="shrink-0 px-5 py-4 border-b border-white/40">
        <div className="text-sm font-semibold text-slate-900">AI Chat</div>
        <div className="text-xs text-slate-500">
          Ask questions or request edits to the plan.
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto px-5 py-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-sm text-slate-500">
            Try: “What should we do on day 2 afternoon?” or “Make day 1 cheaper.”
          </div>
        ) : null}

        {messages.map((m, i) => (
          <div
            key={i}
            className={[
              "max-w-[92%] rounded-2xl border border-white/45 px-4 py-3 text-sm",
              m.role === "user"
                ? "ml-auto bg-white/70 text-slate-900"
                : "bg-white/60 text-slate-800",
            ].join(" ")}
          >
            {m.content}
          </div>
        ))}

        {isSending ? (
          <div className="max-w-[92%] rounded-2xl bg-white/60 border border-white/45 px-4 py-3 text-sm text-slate-600">
            Thinking…
          </div>
        ) : null}

        <div ref={endRef} />
      </div>

      <div className="shrink-0 p-4 border-t border-white/40 bg-white/30">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            placeholder="Ask something about this trip…"
            className="flex-1 h-11 rounded-2xl bg-white/70 border border-white/55 px-4 text-sm outline-none"
          />
          <button
            onClick={send}
            disabled={isSending}
            className="h-11 px-4 rounded-2xl text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}