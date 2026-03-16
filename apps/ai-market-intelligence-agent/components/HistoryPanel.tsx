"use client";

import { useEffect, useState } from "react";

type Entry = { runAt: string; mode: string; duplicate: boolean; chartPath: string };

export function HistoryPanel() {
  const [history, setHistory] = useState<Entry[]>([]);
  useEffect(() => { void (async () => { const res = await fetch("/api/history"); const json = await res.json(); setHistory(json.history || []); })(); }, []);

  return (
    <section className="rounded-xl border bg-white p-4">
      <h3 className="mb-2 font-semibold">Run history</h3>
      <ul className="space-y-2 text-sm">
        {history.map((h, i) => <li key={i} className="rounded border p-2">{new Date(h.runAt).toLocaleString()} • {h.mode} • duplicate: {String(h.duplicate)}</li>)}
      </ul>
    </section>
  );
}
