"use client";

import { useEffect, useState } from "react";

type Site = { id: string; label: string; url: string };
type Report = { id: string; siteId: string; at: string; classification: string; severity: number; summary: string };

export function Dashboard() {
  const [sites, setSites] = useState<Site[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  async function load() {
    const [s, r] = await Promise.all([fetch("/api/sites"), fetch("/api/reports")]);
    const sj = await s.json(); const rj = await r.json();
    setSites(sj.sites || []); setReports(rj.reports || []);
  }

  useEffect(()=>{ void load(); },[]);

  async function run(site: Site) {
    await fetch("/api/monitor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ siteId: site.id, url: site.url }) });
    await load();
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-xl border bg-white p-4">
        <h3 className="mb-2 font-semibold">Monitored sites</h3>
        <ul className="space-y-2 text-sm">
          {sites.map((s)=><li key={s.id} className="rounded border p-2"><p className="font-medium">{s.label}</p><p className="text-slate-500">{s.url}</p><button className="mt-2 rounded bg-indigo-600 px-2 py-1 text-xs text-white" onClick={()=>void run(s)}>Run monitor</button></li>)}
        </ul>
      </section>
      <section className="rounded-xl border bg-white p-4">
        <h3 className="mb-2 font-semibold">Latest reports</h3>
        <ul className="space-y-2 text-sm">
          {reports.slice(0,8).map((r)=><li key={r.id} className="rounded border p-2"><p>{new Date(r.at).toLocaleString()} • {r.classification} • severity {r.severity}</p><p className="text-slate-600 line-clamp-3">{r.summary}</p></li>)}
        </ul>
      </section>
    </div>
  );
}
