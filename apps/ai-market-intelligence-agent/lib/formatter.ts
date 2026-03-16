import { Coin } from "./types";

export function topMovers(coins: Coin[]) {
  const sorted = [...coins].sort((a,b)=> (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0));
  return { gainers: sorted.slice(0,3), losers: sorted.slice(-3).reverse() };
}

export function summarizeStats(coins: Coin[]) {
  const avg = coins.reduce((acc,c)=>acc+(c.price_change_percentage_24h??0),0)/Math.max(1,coins.length);
  return `Tracked ${coins.length} major assets. Average 24h move: ${avg.toFixed(2)}%.`;
}
