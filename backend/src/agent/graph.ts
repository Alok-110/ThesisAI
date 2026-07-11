import { StateGraph } from "@langchain/langgraph";
import { AgentState } from "./state";
import { fetchNewsNode } from "./nodes/fetchNews";
import { sentimentAnalysisNode } from "./nodes/sentimentAnalysis";
import { riskAnalysisNode } from "./nodes/riskAnalysis";
import { checkSufficiency, incrementRetryNode } from "./nodes/checkSufficiency";
import { synthesizeNode } from "./nodes/synthesize";

const graph = new StateGraph(AgentState)
  .addNode("fetchNews", fetchNewsNode)
  .addNode("sentimentAnalysis", sentimentAnalysisNode)
  .addNode("riskAnalysis", riskAnalysisNode)
  .addNode("incrementRetry", incrementRetryNode)
  .addNode("synthesize", synthesizeNode)

  .addEdge("__start__", "fetchNews")
  .addEdge("fetchNews", "sentimentAnalysis")
  .addEdge("fetchNews", "riskAnalysis")

  // conditional edge: after both analyses, decide whether to loop back or proceed
  .addConditionalEdges("sentimentAnalysis", checkSufficiency, {
    fetchNews: "incrementRetry",
    synthesize: "synthesize",
  })
  .addEdge("incrementRetry", "fetchNews")

  .addEdge("riskAnalysis", "synthesize")
  .addEdge("synthesize", "__end__");

export const investmentAgent = graph.compile();