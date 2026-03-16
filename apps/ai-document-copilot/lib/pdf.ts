import pdfParse from "pdf-parse";

export async function parsePdf(buffer: Buffer): Promise<{ page: number; text: string }[]> {
  const parsed = await pdfParse(buffer);
  const pages = parsed.text.split("

").filter(Boolean);
  if (pages.length === 0) return [{ page: 1, text: parsed.text }];
  return pages.map((text, i) => ({ page: i + 1, text }));
}
