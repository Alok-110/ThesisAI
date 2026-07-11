import { llm } from "../llm";
import { AgentState } from "../state";

export async function sentimentAnalysisNode(state: typeof AgentState.State) {
  const newsSummary = state.newsData
    .map((n) => `- ${n.title}: ${n.content}`)
    .join("\n");

  const prompt = `You are a financial analyst. Based on the following recent news about ${state.companyName}, analyze the overall sentiment.

News:
${newsSummary}

Respond ONLY with valid JSON in this exact shape, no other text:
{
  "score": "Positive" | "Neutral" | "Negative",
  "summary": "one or two sentence explanation"
}`;

  const response = await llm.invoke(prompt);
  const raw = response.content as string;

  // strip markdown code fences if the model wraps the JSON in them
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  return { sentiment: parsed };
}