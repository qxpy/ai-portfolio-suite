export type Coin = { id: string; symbol: string; name: string; current_price: number; price_change_percentage_24h: number; total_volume: number; market_cap: number };
export type RunOptions = { mode: "tweet" | "newsletter"; dryRun?: boolean; };
