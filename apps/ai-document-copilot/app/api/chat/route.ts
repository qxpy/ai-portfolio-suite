import { NextResponse } from "next/server";
import { callOpenAIChat } from "@repo/shared/src/index";
import { retrieveForQuestion } from "@/lib/retrieval";

const fallback = "I couldn’t find enough support for that in the uploaded document.";

export async function POST(req: Request) {
  const { question } = await req.json();
  if (!question) return NextResponse.json({ error: "question required" }, { status: 400 });

  const hits = await retrieveForQuestion(question);
  const strongHits = hits.filter((h) => h.score > 0.15);
  if (strongHits.length === 0) return NextResponse.json({ answer: fallback, sources: [] });

  const context = strongHits
    .map((h, i) => `Source ${i + 1} [${h.chunk.fileName}, page ${h.chunk.page}]: ${h.chunk.text}`)
    .join("\n\n");

  const answer = await callOpenAIChat({
    apiKey: process.env.OPENAI_API_KEY ?? "",
    baseUrl: process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1",
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    messages: [
      { role: "system", content: `Answer using only the provided context. If context is insufficient, output exactly: ${fallback}` },
      { role: "user", content: `Question: ${question}\n\nContext:\n${context}` }
    ]
  });

  return NextResponse.json({
    answer: answer || fallback,
    sources: strongHits.map((h) => ({ ...h.chunk, score: h.score }))
  });
}
