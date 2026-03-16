import { readJson, writeJson } from "./storage";

export async function logAnalytics(event: string, payload: Record<string, unknown>) {
  const logs = await readJson<Record<string, unknown>[]>("analytics.json", []);
  logs.unshift({ event, payload, at: new Date().toISOString() });
  await writeJson("analytics.json", logs.slice(0, 300));
}
