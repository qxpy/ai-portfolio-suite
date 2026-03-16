"use client";

import { useState } from "react";

type Source = { fileName: string; page: number; text: string; score?: number };

export function ChatPanel() {
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);

  async function ask() {
    setLoading(true);
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: q }) });
    const json = await res.json();
    setAnswer(json.answer);
    setSources(json.sources || []);
    setLoading(false);
  }

  return (
    <section className="rounded-xl border bg-white p-4">
      <h3 className="mb-3 font-semibold">Chat with your documents</h3>
      <div className="flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Ask a question grounded in uploaded PDFs" />
        <button onClick={() => void ask()} className="rounded bg-slate-900 px-4 py-2 text-white">Ask</button>
      </div>
      {loading && <p className="mt-3 text-sm text-slate-500">Thinking...</p>}
      {answer && <p className="mt-4 rounded bg-slate-50 p-3 text-sm">{answer}</p>}
      {sources.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Sources</p>
          {sources.map((s, i) => (
            <div key={`${s.fileName}-${i}`} className="rounded border p-2 text-xs">
              <p className="font-medium">{s.fileName} · page {s.page} {typeof s.score === "number" ? `· score ${s.score.toFixed(3)}` : ""}</p>
              <p className="text-slate-600">{s.text.slice(0, 190)}...</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
