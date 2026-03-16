import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

export async function ensureDataDir() { await mkdir(dataDir, { recursive: true }); }

export async function readJson<T>(name: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const file = path.join(dataDir, name);
  try { return JSON.parse(await readFile(file, "utf-8")) as T; } catch { return fallback; }
}

export async function writeJson<T>(name: string, payload: T) {
  await ensureDataDir();
  const file = path.join(dataDir, name);
  await writeFile(file, JSON.stringify(payload, null, 2));
}
