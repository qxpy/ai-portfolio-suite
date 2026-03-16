import { getHistory } from "./historyLogger";

export async function isDuplicate(content: string) {
  const history = await getHistory();
  return history.some((h) => typeof h.content === "string" && h.content.slice(0, 120) === content.slice(0, 120));
}
