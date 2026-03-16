import { NextResponse } from "next/server";
import { addSite, getSites } from "@/lib/sites";

export async function GET(){ return NextResponse.json({ sites: await getSites() }); }
export async function POST(req: Request){
  const { url, label, tags } = await req.json();
  if(!url || !label) return NextResponse.json({ error: "url and label required" }, { status: 400 });
  return NextResponse.json(await addSite({ url, label, tags }));
}
