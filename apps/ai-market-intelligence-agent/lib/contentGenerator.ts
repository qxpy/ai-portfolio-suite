import { callOpenAIChat } from "@repo/shared/src/index";

export async function generateContent(prompt: string) {
  return callOpenAIChat({
    apiKey: process.env.OPENAI_API_KEY ?? "",
    baseUrl: process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1",
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    messages: [{ role: "system", content: "Write concise, data-aware content with no hype." }, { role: "user", content: prompt }],
    temperature: 0.3
  });
}
