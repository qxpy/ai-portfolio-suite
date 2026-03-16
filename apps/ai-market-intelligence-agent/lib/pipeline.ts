import { fetchMarketData } from "./marketFetcher";
import { summarizeStats, topMovers } from "./formatter";
import { buildPrompt } from "./promptBuilder";
import { generateContent } from "./contentGenerator";
import { generateChart } from "./chartGenerator";
import { isDuplicate } from "./duplicateGuard";
import { logAnalytics } from "./analyticsLogger";
import { saveRun } from "./historyLogger";
import { RunOptions } from "./types";

export async function runPipeline(options: RunOptions) {
  const topN = Number(process.env.MARKET_TOP_N ?? 8);
  const coins = await fetchMarketData(topN);
  const movers = topMovers(coins);
  const stats = summarizeStats(coins);
  const prompt = buildPrompt(
    options.mode,
    coins,
    `${stats}\nTop gainers: ${movers.gainers.map((g) => g.symbol).join(",")}. Top losers: ${movers.losers.map((l) => l.symbol).join(",")}.`
  );
  const content = await generateContent(prompt);
  const duplicate = await isDuplicate(content);
  const chartPath = await generateChart(coins);
  const result = { runAt: new Date().toISOString(), mode: options.mode, dryRun: !!options.dryRun, chartPath, duplicate, stats, movers, content };
  await logAnalytics("pipeline_run", { mode: options.mode, duplicate, count: coins.length });
  if (!options.dryRun && !duplicate) await saveRun(result as unknown as Record<string, unknown>);
  return result;
}
