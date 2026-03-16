'use client'
import { HistoryPanel } from "@/components/HistoryPanel";
import { RunPanel } from "@/components/RunPanel";

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6">
      <header>
        <h1 className="text-3xl font-bold">AI Market Intelligence Agent</h1>
        <p className="text-slate-600">Fetch crypto market data, generate chart-backed insights, and output tweet/newsletter content.</p>
      </header>
      <RunPanel onDone={async () => undefined} />
      <HistoryPanel />
    </main>
  );
}
