import { AgentState } from "../state";

// Returns the name of the next node to run
export function checkSufficiency(state: typeof AgentState.State): string {
  const hasEnoughNews = state.newsData && state.newsData.length >= 2;
  const underRetryLimit = (state.retryCount ?? 0) < 2;

  if (!hasEnoughNews && underRetryLimit) {
    return "fetchNews"; // loop back for more data
  }
  return "synthesize"; // proceed
}

// Small node that just increments the retry counter before looping back
export async function incrementRetryNode(state: typeof AgentState.State) {
  return { retryCount: (state.retryCount ?? 0) + 1 };
}