"use client";

import { useState } from "react";

export function RunPanel({ onDone }: { onDone: () => Promise<void> }) {
  const [mode, setMode] = useState<"tweet"|"newsletter">("tweet");
  const [dryRun, setDryRun] = useState(true);
  const [result, setResult] = useState<string>("");

  async function run() {
    const res = await fetch("/api/run", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode, dryRun }) });
    const json = await res.json();
    setResult(json.content || "No output");
    await onDone();
  }

  return (
    <section className="rounded-xl border bg-white p-4 space-y-3">
      <h3 className="font-semibold">Run AI market pipeline</h3>
      <div className="flex gap-3">
        <select value={mode} onChange={(e)=>setMode(e.target.value as "tweet"|"newsletter")} className="rounded border px-2 py-1">
          <option value="tweet">Tweet mode</option>
          <option value="newsletter">Newsletter mode</option>
        </select>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={dryRun} onChange={(e)=>setDryRun(e.target.checked)} /> Dry run</label>
        <button className="rounded bg-slate-900 px-3 py-1 text-white" onClick={()=>void run()}>Run</button>
      </div>
      {result && <pre className="whitespace-pre-wrap rounded bg-slate-50 p-3 text-xs">{result}</pre>}
    </section>
  );
}
