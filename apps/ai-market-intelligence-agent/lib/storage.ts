import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
const dataDir = path.join(process.cwd(), "data");
export async function ensure(){ await mkdir(path.join(dataDir, "charts"), { recursive: true }); }
export async function readJson<T>(name: string, fallback: T){ await ensure(); try { return JSON.parse(await readFile(path.join(dataDir,name),"utf-8")) as T; } catch { return fallback; } }
export async function writeJson<T>(name: string, value: T){ await ensure(); await writeFile(path.join(dataDir,name), JSON.stringify(value,null,2)); }
