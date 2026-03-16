# AI Competitor Monitor

A website monitoring tool that captures snapshots, detects meaningful text deltas, and generates classified AI change reports.

## Why this matters

Demonstrates practical competitive intelligence tooling with automated ingestion, change detection logic, and AI summarization.

## Features

- Add monitored websites
- Snapshot and normalize HTML content
- Detect meaningful added/removed lines
- AI-generated summary of changes
- Change classification (pricing/product copy/new feature/new section/CTA)
- Local report history dashboard

## Architecture

- `snapshot` for fetch + normalization
- `diff` for text delta detection
- `classifier` for category inference
- `summarizer` for LLM output
- `reports/sites` for local persistence

## Setup

```bash
pnpm install
pnpm --filter ai-competitor-monitor dev
```

## Environment variables

```env
OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
```

## Usage

1. Add a competitor site.
2. Run monitor once (captures baseline).
3. Run monitor again later to generate a change report.

## Limitations

- Focuses on text-based deltas; no visual DOM diff yet.
- No external alert channels in this version.

## Production upgrade ideas

- Scheduled monitoring jobs
- Slack/email alert integrations
- Screenshot diff attachments
- Severity calibration per monitored company

## Example output

> “Competitor introduced a pricing table with annual plan messaging, added stronger CTA copy in hero section, and updated feature language around analytics integrations.”

## Screenshots

_Add screenshot here after running locally._
