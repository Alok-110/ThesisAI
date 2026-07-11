import { StateGraph } from "@langchain/langgraph";
import { AgentState } from "./state";
import { fetchNewsNode } from "./nodes/fetchNews";
import { sentimentAnalysisNode } from "./nodes/sentimentAnalysis";
import { riskAnalysisNode } from "./nodes/riskAnalysis";
import { checkSufficiency, incrementRetryNode } from "./nodes/checkSufficiency";
import { synthesizeNode } from "./nodes/synthesize";
import { fetchFinancialsNode } from "./nodes/fetchFinancials";

console.log("[graph.ts] File loaded, building graph...");
const graph = new StateGraph(AgentState)
  .addNode("fetchNews", fetchNewsNode)
  .addNode("fetchFinancials", fetchFinancialsNode)
  .addNode("sentimentAnalysis", sentimentAnalysisNode)
  .addNode("riskAnalysis", riskAnalysisNode)
  .addNode("incrementRetry", incrementRetryNode)
  .addNode("synthesize", synthesizeNode)

  .addEdge("__start__", "fetchNews")
  .addEdge("__start__", "fetchFinancials")
  .addEdge("fetchNews", "sentimentAnalysis")
  .addEdge("fetchNews", "riskAnalysis")

  .addConditionalEdges("sentimentAnalysis", checkSufficiency, {
    fetchNews: "incrementRetry",
    synthesize: "synthesize",
  })
  .addEdge("incrementRetry", "fetchNews")

  .addEdge("riskAnalysis", "synthesize")
  .addEdge("fetchFinancials", "synthesize")

  .addEdge("synthesize", "__end__");

export const investmentAgent = graph.compile();