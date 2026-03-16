export function classifyChange(text: string) {
  const lower = text.toLowerCase();
  if (/(pricing|price|plan|billing)/.test(lower)) return "pricing";
  if (/(feature|launch|new tool|integration)/.test(lower)) return "new feature";
  if (/(cta|sign up|book demo|get started)/.test(lower)) return "cta / landing page update";
  if (/(section|announcement|blog)/.test(lower)) return "new section";
  return "product copy";
}
