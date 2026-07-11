import { PriceChart } from "./PriceChart";

interface Financials {
  marketCap: string | null;
  peRatio: string | null;
  week52High: string | null;
  week52Low: string | null;
  sector: string | null;
  priceHistory: { date: string; close: number }[];
}

function formatMarketCap(value: string | null): string {
  if (!value) return "—";
  const num = parseFloat(value);
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num}`;
}

export function FundamentalsCard({ financials }: { financials: Financials | null }) {
  if (!financials) return null;

  const rows = [
    { label: "Market Cap", value: formatMarketCap(financials.marketCap) },
    { label: "P/E Ratio", value: financials.peRatio ?? "—" },
    { label: "52W High", value: financials.week52High ? `$${financials.week52High}` : "—" },
    { label: "52W Low", value: financials.week52Low ? `$${financials.week52Low}` : "—" },
    { label: "Sector", value: financials.sector ?? "—" },
  ];

  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <h2 className="mb-3 text-sm font-semibold text-foreground">Fundamentals</h2>
      <div className="mb-5">
        <PriceChart data={financials.priceHistory} />
      </div>
      <dl className="grid grid-cols-2 gap-y-2 text-xs">
        {rows.map((row) => (
          <div key={row.label} className="contents">
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="font-mono text-right text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}