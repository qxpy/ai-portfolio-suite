import { classifyChange } from "./classifier";
import { diffLines } from "./diff";
import { saveReport } from "./reports";
import { fetchSnapshot, getSnapshots } from "./snapshot";
import { summarizeChange } from "./summarizer";

export async function runMonitor(siteId: string, url: string) {
  const previousList = await getSnapshots(siteId);
  const previous = previousList[0];
  const current = await fetchSnapshot(siteId, url);
  if (!previous) {
    return saveReport({
      siteId,
      at: new Date().toISOString(),
      summary: "Initial snapshot captured. Re-run monitor to detect changes.",
      classification: "new section",
      severity: 1,
      added: [],
      removed: []
    });
  }

  const diff = diffLines(previous.normalizedText, current.normalizedText);
  const combined = [...diff.added, ...diff.removed].join(" ");
  const classification = classifyChange(combined);
  const summary = await summarizeChange(diff.added, diff.removed);
  const severity = Math.min(10, Math.max(1, diff.delta));

  return saveReport({
    siteId,
    at: new Date().toISOString(),
    summary,
    classification,
    severity,
    added: diff.added,
    removed: diff.removed
  });
}
