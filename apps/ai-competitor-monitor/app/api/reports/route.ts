import { NextResponse } from "next/server";
import { getReports } from "@/lib/reports";

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const siteId = searchParams.get("siteId") ?? undefined;
  return NextResponse.json({ reports: await getReports(siteId) });
}
