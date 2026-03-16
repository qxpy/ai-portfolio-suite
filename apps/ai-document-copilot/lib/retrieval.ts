import { embedText } from "./embedding";
import { querySimilar } from "./vectorstore";

export async function retrieveForQuestion(question: string) {
  const embedding = await embedText(question);
  return querySimilar(embedding, 5);
}
