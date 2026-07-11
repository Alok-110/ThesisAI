import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function PriceChart({ data }: { data: { date: string; close: number }[] }) {
  if (!data || data.length === 0) {
    return <p className="text-xs text-muted-foreground">Price history unavailable.</p>;
  }

  const first = data[0].close;
  const last = data[data.length - 1].close;
  const change = (((last - first) / first) * 100).toFixed(2);
  const isUp = last >= first;

  return (
    <div>
      <div className="mb-3 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold text-foreground">${last.toFixed(2)}</span>
        <span className={`font-mono text-sm ${isUp ? "text-success" : "text-destructive"}`}>
          {isUp ? "+" : ""}{change}% (30d)
        </span>
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis domain={["auto", "auto"]} hide />
          <Tooltip
            contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 4, fontSize: 12 }}
            labelStyle={{ color: "var(--muted-foreground)" }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Close"]}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke={isUp ? "var(--success)" : "var(--destructive)"}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}