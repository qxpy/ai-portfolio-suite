# AI Market Intelligence Agent

AI automation pipeline for crypto market intelligence and content generation.

## Why this matters

Shows how to combine market API ingestion, AI summarization, chart generation, and output workflows in a clean modular architecture.

## Features

- Public market data ingestion (CoinGecko)
- Top gainer/loser analysis
- LLM-generated tweet/newsletter content
- Local chart image generation
- Dry-run and duplicate-content prevention
- Local history + analytics logging

## Architecture

- `marketFetcher` → data ingestion
- `formatter` + `promptBuilder` → transformation
- `contentGenerator` → LLM output
- `chartGenerator` → PNG chart
- `historyLogger` + `analyticsLogger` → persistence

## Setup

```bash
pnpm install
pnpm --filter ai-market-intelligence-agent dev
```

## Environment variables

```env
OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
MARKET_TOP_N=8
MARKET_WATCHLIST=bitcoin,ethereum,solana
```

## Usage examples

- Tweet mode + dry run for quick previews
- Newsletter mode for longer daily/weekly summaries

## Limitations

- Relies on third-party market API availability.
- Local JSON storage only for development.

## Production upgrade ideas

- Add scheduled jobs and approval queues
- Add Telegram/Slack/Twitter publishing adapters
- Add vector memory of past market narratives

## Example output

> “Market breadth is mixed today. SOL and BTC are leading with strong relative momentum while ETH lags volume-adjusted performance...”

## Screenshots

_Add screenshot here after running locally._
