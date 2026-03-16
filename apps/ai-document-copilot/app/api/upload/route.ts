import { NextResponse } from "next/server";
import { chunkText } from "@/lib/chunker";
import { saveDocument } from "@/lib/documents";
import { embedText } from "@/lib/embedding";
import { parsePdf } from "@/lib/pdf";
import { upsertChunks } from "@/lib/vectorstore";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    if (!file) return NextResponse.json({ error: "file required" }, { status: 400 });
    const buffer = Buffer.from(await file.arrayBuffer());
    const pages = await parsePdf(buffer);

    const record = await saveDocument({
      fileName: file.name,
      uploadedAt: new Date().toISOString(),
      indexedAt: new Date().toISOString(),
      pageCount: pages.length,
      chunkCount: 0
    });

    const chunkSize = Number(process.env.DOC_CHAT_CHUNK_SIZE ?? 900);
    const overlap = Number(process.env.DOC_CHAT_CHUNK_OVERLAP ?? 180);
    let chunkCount = 0;
    const payload = [];

    for (const p of pages) {
      const chunks = chunkText(p.text, chunkSize, overlap);
      for (const [idx, text] of chunks.entries()) {
        const embedding = await embedText(text);
        payload.push({
          id: `${record.id}-${p.page}-${idx}`,
          documentId: record.id,
          fileName: file.name,
          page: p.page,
          chunkIndex: idx,
          text,
          embedding
        });
        chunkCount++;
      }
    }

    await upsertChunks(payload);
    return NextResponse.json({ ok: true, documentId: record.id, chunkCount });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
