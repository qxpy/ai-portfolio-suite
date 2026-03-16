import { readJson, writeJson } from "./storage";

export async function saveRun(entry: Record<string, unknown>) {
  const history = await readJson<Record<string, unknown>[]>("history.json", []);
  history.unshift(entry);
  await writeJson("history.json", history.slice(0, 100));
}

export async function getHistory() { return readJson<Record<string, unknown>[]>("history.json", []); }
