"use client";

import { useEffect, useState } from "react";

type Doc = { id: string; fileName: string; pageCount: number; chunkCount: number };

export function DocumentList() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const load = async () => {
    const res = await fetch("/api/documents");
    const json = await res.json();
    setDocs(json.documents || []);
  };
  useEffect(() => { void load(); }, []);

  async function remove(id: string) {
    await fetch("/api/documents", { method: "DELETE", body: JSON.stringify({ id }) });
    await load();
  }

  return (
    <div className="rounded-xl border bg-white p-4">
      <h3 className="mb-3 font-semibold">Indexed documents</h3>
      <ul className="space-y-2 text-sm">
        {docs.map((d) => (
          <li key={d.id} className="flex items-center justify-between rounded border p-2">
            <div>
              <p className="font-medium">{d.fileName}</p>
              <p className="text-slate-500">{d.pageCount} pages • {d.chunkCount} chunks</p>
            </div>
            <button className="rounded bg-rose-100 px-3 py-1 text-rose-700" onClick={() => void remove(d.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
