import { randomUUID } from "crypto";
import { Report } from "./types";
import { readJson, writeJson } from "./storage";

const FILE = "reports.json";

export async function saveReport(input: Omit<Report, "id">) {
  const reports = await readJson<Report[]>(FILE, []);
  const report: Report = { id: randomUUID(), ...input };
  reports.unshift(report);
  await writeJson(FILE, reports.slice(0, 500));
  return report;
}

export async function getReports(siteId?: string) {
  const all = await readJson<Report[]>(FILE, []);
  return siteId ? all.filter((r) => r.siteId === siteId) : all;
}
