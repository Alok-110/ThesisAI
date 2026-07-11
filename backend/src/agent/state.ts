import { Annotation } from "@langchain/langgraph";

export const AgentState = Annotation.Root({
  companyName: Annotation<string>,
  newsData: Annotation<{ title: string; content: string; url: string }[]>,
  financials: Annotation<any>,
  sentiment: Annotation<{ score: string; summary: string }>,
  risk: Annotation<{ level: string; factors: string[] }>,
  verdict: Annotation<{
    tier: string; // "Strong Buy" | "Buy" | "Hold" | "Caution" | "Avoid"
    confidenceScore: number; // 0-100
    riskFactor: string;
    timeHorizon: string;
    allocationBand: string;
    keyDrivers: string[];
    keyRisks: string[];
  }>,
  retryCount: Annotation<number>({
    reducer: (_, next) => next,
    default: () => 0,
  }),
});