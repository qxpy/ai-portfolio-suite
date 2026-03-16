import { randomUUID } from "crypto";
import { Snapshot } from "./types";
import { readJson, writeJson } from "./storage";

const FILE = "snapshots.json";

export function normalizeHtml(html: string){
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchSnapshot(siteId: string, url: string){
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Unable to fetch ${url}`);
  const html = await res.text();
  const normalizedText = normalizeHtml(html);
  const snapshot: Snapshot = { id: randomUUID(), siteId, capturedAt: new Date().toISOString(), normalizedText, rawLength: html.length };
  const all = await readJson<Snapshot[]>(FILE,[]);
  all.unshift(snapshot);
  await writeJson(FILE, all.slice(0, 500));
  return snapshot;
}

export async function getSnapshots(siteId: string){
  const all = await readJson<Snapshot[]>(FILE,[]);
  return all.filter(s=>s.siteId===siteId).sort((a,b)=> b.capturedAt.localeCompare(a.capturedAt));
}
