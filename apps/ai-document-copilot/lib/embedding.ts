export async function embedText(text: string): Promise<number[]> {
  const response = await fetch(`${process.env.OPENAI_BASE_URL}/embeddings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({ model: "text-embedding-3-small", input: text })
  });
  if (!response.ok) throw new Error(`Embedding failed: ${response.status}`);
  const json = await response.json();
  return json.data?.[0]?.embedding ?? [];
}
