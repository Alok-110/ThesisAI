import { llm } from "../llm";
import { AgentState } from "../state";

export async function riskAnalysisNode(state: typeof AgentState.State) {
  const newsSummary = state.newsData
    .map((n) => `- ${n.title}: ${n.content}`)
    .join("\n");

  const prompt = `You are a financial risk analyst. Based on the following recent news about ${state.companyName}, assess the investment risk.

News:
${newsSummary}

Respond ONLY with valid JSON in this exact shape, no other text:
{
  "level": "Low" | "Medium" | "High" | "Volatile",
  "factors": ["short risk factor 1", "short risk factor 2", "short risk factor 3"]
}`;

  const response = await llm.invoke(prompt);
  const raw = response.content as string;
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  return { risk: parsed };
}