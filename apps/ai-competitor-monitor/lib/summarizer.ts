import { callOpenAIChat } from "@repo/shared/src/index";

export async function summarizeChange(added: string[], removed: string[]) {
  const prompt = `Summarize website changes in 4 concise bullet points. Added: ${added.join(" | ")} Removed: ${removed.join(" | ")}`;
  return callOpenAIChat({
    apiKey: process.env.OPENAI_API_KEY ?? "",
    baseUrl: process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1",
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    messages: [{ role: "system", content: "You are a B2B competitive intelligence analyst." }, { role: "user", content: prompt }],
    temperature: 0.2
  });
}
