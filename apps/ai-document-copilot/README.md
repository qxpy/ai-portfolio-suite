# AI Document Copilot

A production-style PDF RAG assistant that supports document upload, indexing, retrieval, and grounded chat answers with source citations.

## Why this matters

This project demonstrates practical RAG architecture with local persistence and clear upgrade paths to managed vector databases.

## Features

- PDF upload and parsing
- Chunking with configurable chunk size/overlap
- Embedding + local vector retrieval
- Grounded chat answers only
- Source citations (file + page + chunk preview)
- Document listing and deletion

## Architecture

- `app/api/upload` — ingest and index PDFs
- `app/api/chat` — retrieve + answer
- `app/api/documents` — list/delete docs
- `lib/*` — chunking, parsing, embedding, retrieval, vector store abstraction

## Setup

```bash
pnpm install
pnpm --filter ai-document-copilot dev
```

Environment variables:

```env
OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
DOC_CHAT_CHUNK_SIZE=900
DOC_CHAT_CHUNK_OVERLAP=180
DOC_CHAT_DEBUG=false
```

## Usage example

1. Upload a PDF.
2. Ask: "What are the main risks discussed?"
3. Inspect source citations below the answer.

## Limitations

- Optimized for text-heavy PDFs.
- Uses local JSON storage for development.

## Production upgrade ideas

- Swap vector store with Pinecone/Supabase adapter
- Add OCR for scanned docs
- Add multi-user auth and persistent chat threads

## Example output

> “The document highlights concentration risk, liquidity risk, and governance risk...”

Sources:
- `risk-report.pdf`, page 3, chunk 4
- `risk-report.pdf`, page 6, chunk 2

## Screenshots

_Add screenshot here after running locally._
