import { randomUUID } from "crypto";
import { DocumentRecord } from "./types";
import { readJson, writeJson } from "./storage";

const DOC_FILE = "documents.json";

export async function listDocuments() { return readJson<DocumentRecord[]>(DOC_FILE, []); }

export async function saveDocument(meta: Omit<DocumentRecord, "id">) {
  const docs = await listDocuments();
  const record: DocumentRecord = { id: randomUUID(), ...meta };
  docs.push(record);
  await writeJson(DOC_FILE, docs);
  return record;
}

export async function removeDocument(id: string) {
  const docs = await listDocuments();
  await writeJson(DOC_FILE, docs.filter((d) => d.id !== id));
}
