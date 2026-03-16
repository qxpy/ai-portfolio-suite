import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { writeFile } from "fs/promises";
import path from "path";
import { Coin } from "./types";

export async function generateChart(coins: Coin[]) {
  const canvas = new ChartJSNodeCanvas({ width: 900, height: 420, backgroundColour: "white" });
  const buffer = await canvas.renderToBuffer({
    type: "bar",
    data: {
      labels: coins.map((c)=>c.symbol.toUpperCase()),
      datasets: [{ label: "24h %", data: coins.map((c)=>Number((c.price_change_percentage_24h ?? 0).toFixed(2))), backgroundColor: coins.map(c => (c.price_change_percentage_24h ?? 0) >= 0 ? "#16a34a" : "#dc2626") }]
    },
    options: { plugins: { legend: { display: false } }, scales: { y: { ticks: { callback: (v) => `${v}%` } } } }
  });
  const fileName = `market-${Date.now()}.png`;
  const relative = `charts/${fileName}`;
  await writeFile(path.join(process.cwd(), "data", relative), buffer);
  return relative;
}
