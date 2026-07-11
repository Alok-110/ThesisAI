import { StateGraph, Annotation } from "@langchain/langgraph";
import { llm } from "./llm";

// Define the shared state shape that flows between nodes
const GraphState = Annotation.Root({
  greeting: Annotation<string>,
  sum: Annotation<number>,
});

// Node 1: ask the LLM for a short greeting
async function greetNode(state: typeof GraphState.State) {
  const response = await llm.invoke("Say a short one-line greeting for a user starting a new app.");
  return { greeting: response.content as string };
}

// Node 2: plain logic, no LLM — proves nodes don't all have to call the model
async function addNode(state: typeof GraphState.State) {
  return { sum: 3 + 6 };
}

const graph = new StateGraph(GraphState)
  .addNode("greet", greetNode)
  .addNode("add", addNode)
  .addEdge("__start__", "greet")
  .addEdge("greet", "add")
  .addEdge("add", "__end__");

export const helloGraph = graph.compile();