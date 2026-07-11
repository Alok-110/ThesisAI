import { AgentState } from "../state";

export async function fetchFinancialsNode(state: typeof AgentState.State) {

    console.log("[fetchFinancials] NODE STARTED, company:", state.companyName);
  const symbol = state.companyName;

  const fallback = {
    marketCap: null,
    peRatio: null,
    week52High: null,
    week52Low: null,
    sector: null,
    description: null,
    priceHistory: [] as { date: string; close: number }[],
  };

  try {
    const [overviewRes, priceRes] = await Promise.all([
      fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`),
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`),
    ]);

    const overview = await overviewRes.json();
    const priceData = await priceRes.json();

    console.log("[fetchFinancials] overview raw:", JSON.stringify(overview).slice(0, 300));
    console.log("[fetchFinancials] priceData keys:", Object.keys(priceData));

    const timeSeries = priceData["Time Series (Daily)"] || {};
    const priceHistory = Object.entries(timeSeries)
      .slice(0, 30)
      .map(([date, values]: [string, any]) => ({
        date,
        close: parseFloat(values["4. close"]),
      }))
      .reverse();

    return {
      financials: {
        marketCap: overview.MarketCapitalization ?? null,
        peRatio: overview.PERatio ?? null,
        week52High: overview["52WeekHigh"] ?? null,
        week52Low: overview["52WeekLow"] ?? null,
        sector: overview.Sector ?? null,
        description: overview.Description ?? null,
        priceHistory,
      },
    };
  } catch (err) {
    console.error("[fetchFinancials] FAILED:", err);
    return { financials: fallback };
  }
}