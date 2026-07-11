import { llm } from "../llm";
import { AgentState } from "../state";

export async function synthesizeNode(state: typeof AgentState.State) {
  const prompt = `You are a senior investment analyst producing a final verdict for ${state.companyName}.

Sentiment analysis: ${JSON.stringify(state.sentiment)}
Risk analysis: ${JSON.stringify(state.risk)}

Based on this, produce a final investment verdict. Respond ONLY with valid JSON in this exact shape, no other text:
{
  "tier": "Strong Buy" | "Buy" | "Hold" | "Caution" | "Avoid",
  "confidenceScore": <number 0-100>,
  "riskFactor": "Low" | "Medium" | "High" | "Volatile",
  "timeHorizon": "Short-term" | "Long-term",
  "allocationBand": "<short suggestion, e.g. '2-5% of portfolio'>",
  "keyDrivers": ["driver 1", "driver 2", "driver 3"],
  "keyRisks": ["risk 1", "risk 2", "risk 3"]
}

This is for informational purposes only, not financial advice.`;

  const response = await llm.invoke(prompt);
  const raw = response.content as string;
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  return { verdict: parsed };
}