import { NextResponse } from "next/server";
import { runPipeline } from "@/lib/pipeline";

export async function POST(req: Request) {
  const { mode = "tweet", dryRun = false } = await req.json();
  const result = await runPipeline({ mode, dryRun });
  return NextResponse.json(result);
}
