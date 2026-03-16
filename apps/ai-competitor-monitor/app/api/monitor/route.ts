import { NextResponse } from "next/server";
import { runMonitor } from "@/lib/monitor";

export async function POST(req: Request){
  const { siteId, url } = await req.json();
  if(!siteId || !url) return NextResponse.json({ error: "siteId and url required" }, { status: 400 });
  return NextResponse.json(await runMonitor(siteId, url));
}
