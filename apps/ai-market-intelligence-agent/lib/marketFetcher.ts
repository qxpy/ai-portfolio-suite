import { Coin } from "./types";

export async function fetchMarketData(topN: number): Promise<Coin[]> {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${topN}&page=1&sparkline=false&price_change_percentage=24h`;
  const res = await fetch(url, { next: { revalidate: 120 } });
  if (!res.ok) throw new Error("Failed to fetch market data");
  return (await res.json()) as Coin[];
}
