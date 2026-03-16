export type OpenAIMessage = { role: "system" | "user" | "assistant"; content: string };

export async function callOpenAIChat(args: {
  apiKey: string;
  baseUrl: string;
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
}): Promise<string> {
  const response = await fetch(`${args.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${args.apiKey}`
    },
    body: JSON.stringify({
      model: args.model,
      messages: args.messages,
      temperature: args.temperature ?? 0.2
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI-compatible request failed: ${response.status} ${await response.text()}`);
  }

  const json = await response.json();
  return json.choices?.[0]?.message?.content ?? "";
}
