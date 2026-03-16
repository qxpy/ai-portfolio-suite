# AI Portfolio Suite

A GitHub-ready monorepo containing three production-style AI applications built with **Next.js + TypeScript**:

1. **AI Document Copilot** — a grounded PDF RAG chat app.
2. **AI Market Intelligence Agent** — a crypto research/content automation toolkit.
3. **AI Competitor Monitor** — a website change detection and summarization dashboard.

## Why these 3 projects matter

This suite demonstrates practical, interview-ready execution across:

- Retrieval-augmented generation (RAG) and source-grounded answering
- Data ingestion, processing pipelines, and local persistence
- LLM workflow orchestration and prompt modularity
- Product-minded UX and developer-friendly architecture

## Projects at a glance

| Project | Core Use Case | Key AI Pattern | Persistence | UI |
|---|---|---|---|---|
| `ai-document-copilot` | Chat with uploaded PDFs | RAG + retrieval grounding | JSON vector/doc stores | Chat + source citations |
| `ai-market-intelligence-agent` | Turn market data into content | AI automation pipeline | JSON history + analytics | Dashboard + run controls |
| `ai-competitor-monitor` | Track website copy changes | Diff + LLM change summarization | JSON snapshots/reports | Monitoring dashboard |

## Monorepo structure

```txt
ai-portfolio-suite/
  apps/
    ai-document-copilot/
    ai-market-intelligence-agent/
    ai-competitor-monitor/
  packages/
    shared/
    ui/
    eslint-config/
    typescript-config/
```

## Quick start

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Run each app directly:

```bash
pnpm --filter ai-document-copilot dev
pnpm --filter ai-market-intelligence-agent dev
pnpm --filter ai-competitor-monitor dev
```

## Screenshots

- `apps/ai-document-copilot/README.md` → screenshot placeholder
- `apps/ai-market-intelligence-agent/README.md` → screenshot placeholder
- `apps/ai-competitor-monitor/README.md` → screenshot placeholder

## Hiring-manager summary

This repository highlights end-to-end AI product engineering: transforming raw inputs into useful outputs with reliable architecture, polished UX, and clear operational workflows.

## Resume-ready project descriptions

- Built a source-grounded PDF RAG assistant with chunked indexing, local vector store abstraction, and citation-rich chat UX.
- Built an AI market research/content engine that ingests public crypto data, generates charts, and produces tweet/newsletter assets with duplicate prevention.
- Built a competitor monitoring tool that snapshots websites, detects meaningful content deltas, and classifies changes into business-relevant categories.

## Skills demonstrated

- Next.js App Router + TypeScript
- Tailwind CSS and component-level UI design
- LLM integration with OpenAI-compatible APIs
- Retrieval systems, vector indexing abstractions, and prompt engineering
- Local data persistence and clean service modularization

## Future roadmap

- Add provider adapters (OpenAI, Azure, local models)
- Move local JSON stores to SQLite/Postgres
- Introduce auth, multi-user teams, and notifications
- Add background job queues for scheduled pipelines

## License

MIT
