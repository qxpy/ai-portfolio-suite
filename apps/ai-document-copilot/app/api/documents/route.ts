import { NextResponse } from "next/server";
import { listDocuments, removeDocument } from "@/lib/documents";
import { deleteDocumentVectors } from "@/lib/vectorstore";

export async function GET() { return NextResponse.json({ documents: await listDocuments() }); }

export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await removeDocument(id);
  await deleteDocumentVectors(id);
  return NextResponse.json({ ok: true });
}
