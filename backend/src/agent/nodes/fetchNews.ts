import { tavily } from "@tavily/core";
import { AgentState } from "../state";

const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function fetchNewsNode(state: typeof AgentState.State) {
  const response = await tavilyClient.search(`${state.companyName} company news recent`, {
    searchDepth: "advanced",
    maxResults: 5,
  });

  const newsData = response.results.map((r) => ({
    title: r.title,
    content: r.content,
    url: r.url,
  }));

  return { newsData };
}