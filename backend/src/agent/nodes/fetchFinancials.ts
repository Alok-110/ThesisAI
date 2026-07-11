import { AgentState } from "../state";

export async function fetchFinancialsNode(state: typeof AgentState.State) {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${state.companyName}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
  );
  const data = await res.json();

  return { financials: data };
}