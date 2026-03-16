"use client";

import { useState } from "react";

export function UploadPanel({ onDone }: { onDone: () => Promise<void> }) {
  const [loading, setLoading] = useState(false);

  async function onFile(file: File) {
    setLoading(true);
    const form = new FormData();
    form.append("file", file);
    await fetch("/api/upload", { method: "POST", body: form });
    await onDone();
    setLoading(false);
  }

  return (
    <label className="block rounded-xl border border-dashed bg-white p-6 text-center">
      <input className="hidden" type="file" accept="application/pdf" onChange={(e) => e.target.files?.[0] && void onFile(e.target.files[0])} />
      <span className="text-sm text-slate-600">{loading ? "Indexing PDF..." : "Upload PDF to build retrieval index"}</span>
    </label>
  );
}
