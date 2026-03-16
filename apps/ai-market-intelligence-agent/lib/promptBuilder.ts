import { Coin } from "./types";

export function buildPrompt(mode: "tweet" | "newsletter", coins: Coin[], extra: string) {
  const lines = coins.map((c)=>`- ${c.name} (${c.symbol.toUpperCase()}): $${c.current_price.toLocaleString()} (${(c.price_change_percentage_24h ?? 0).toFixed(2)}% 24h)`).join("\n");
  return `You are a market analyst. Produce ${mode} content from this data.\n${extra}\nData:\n${lines}`;
}
