"use client";

import { useState } from "react";

export function SiteManager({ onRefresh }: { onRefresh: () => Promise<void> }) {
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");

  async function add() {
    await fetch("/api/sites", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url, label }) });
    setUrl(""); setLabel("");
    await onRefresh();
  }

  return (
    <section className="rounded-xl border bg-white p-4 space-y-2">
      <h3 className="font-semibold">Add monitored site</h3>
      <input className="w-full rounded border px-2 py-1" placeholder="Company name" value={label} onChange={(e)=>setLabel(e.target.value)} />
      <input className="w-full rounded border px-2 py-1" placeholder="https://example.com" value={url} onChange={(e)=>setUrl(e.target.value)} />
      <button className="rounded bg-slate-900 px-3 py-1 text-white" onClick={()=>void add()}>Save</button>
    </section>
  );
}
