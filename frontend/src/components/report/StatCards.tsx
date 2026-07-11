import { Gauge, PieChart, ShieldAlert } from "lucide-react";

function ConfidenceGauge({ score }: { score: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const arc = (score / 100) * circumference;

  return (
    <div className="relative size-16" role="img" aria-label={`Confidence score ${score} out of 100`}>
      <svg viewBox="0 0 64 64" className="size-16 -rotate-90">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-secondary" />
        <circle
          cx="32" cy="32" r={radius} fill="none" stroke="currentColor" strokeWidth="6"
          strokeLinecap="round" strokeDasharray={`${arc} ${circumference}`} className="text-teal"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-card-foreground">{score}</span>
    </div>
  );
}

const riskStyles: Record<string, string> = {
  Low: "bg-success/15 text-success",
  Medium: "bg-warning/15 text-warning",
  High: "bg-destructive/15 text-destructive",
  Volatile: "bg-purple/15 text-purple",
};

export function StatCards({
  confidence,
  risk,
  allocation,
}: {
  confidence: number;
  risk: "Low" | "Medium" | "High" | "Volatile";
  allocation: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-lg shadow-black/30">
        <ConfidenceGauge score={confidence} />
        <div className="flex flex-col gap-1">
          <div className="flex size-8 items-center justify-center rounded-lg bg-teal text-teal-foreground">
            <Gauge className="size-4" />
          </div>
          <p className="text-sm text-muted-foreground">Confidence score</p>
          <p className="text-sm font-semibold text-card-foreground">{confidence} / 100</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-lg shadow-black/30">
        <div className="flex size-8 items-center justify-center rounded-lg bg-purple text-purple-foreground">
          <ShieldAlert className="size-4" />
        </div>
        <p className="text-sm text-muted-foreground">Risk factor</p>
        <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${riskStyles[risk]}`}>
          <ShieldAlert className="size-3.5" />
          {risk}
        </span>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-lg shadow-black/30">
        <div className="flex size-8 items-center justify-center rounded-lg bg-warning text-warning-foreground">
          <PieChart className="size-4" />
        </div>
        <p className="text-sm text-muted-foreground">Suggested allocation</p>
        <p className="text-xl font-bold text-card-foreground">{allocation}</p>
      </div>
    </div>
  );
}