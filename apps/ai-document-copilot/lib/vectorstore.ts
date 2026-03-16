import { IndexedChunk } from "./types";
import { readJson, writeJson } from "./storage";

const VECTOR_FILE = "vectors.json";

function cosine(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    dot += a[i] * b[i];
    na += a[i] ** 2;
    nb += b[i] ** 2;
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

export async function upsertChunks(chunks: IndexedChunk[]) {
  const existing = await readJson<IndexedChunk[]>(VECTOR_FILE, []);
  const kept = existing.filter((c) => c.documentId !== chunks[0]?.documentId);
  await writeJson(VECTOR_FILE, [...kept, ...chunks]);
}

export async function deleteDocumentVectors(documentId: string) {
  const existing = await readJson<IndexedChunk[]>(VECTOR_FILE, []);
  await writeJson(VECTOR_FILE, existing.filter((c) => c.documentId !== documentId));
}

export async function querySimilar(queryEmbedding: number[], topK = 5) {
  const vectors = await readJson<IndexedChunk[]>(VECTOR_FILE, []);
  return vectors
    .map((chunk) => ({ chunk, score: cosine(queryEmbedding, chunk.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
