import { NextResponse } from "next/server";
import { getHistory } from "@/lib/historyLogger";
export async function GET(){ return NextResponse.json({ history: await getHistory() }); }
