export function chunkText(text: string, chunkSize: number, overlap: number): string[] {
  const normalized = text.replace(/\s+/g, " ").trim();
  const chunks: string[] = [];
  let i = 0;
  while (i < normalized.length) {
    const chunk = normalized.slice(i, i + chunkSize);
    if (chunk.trim()) chunks.push(chunk);
    i += Math.max(1, chunkSize - overlap);
  }
  return chunks;
}
