import { MessageSquareText, ShieldHalf } from "lucide-react";

export type AnalysisRow = {
  id: string;
  label: string;
  summary: string;
  value: string;
  valueTone: "positive" | "neutral" | "negative";
  icon: "sentiment" | "risk";
};

const toneClasses = { positive: "text-success", neutral: "text-muted-foreground", negative: "text-destructive" };
const iconMap = { sentiment: MessageSquareText, risk: ShieldHalf };
const iconBg = { sentiment: "bg-teal/15 text-teal", risk: "bg-purple/15 text-purple" };

export function AnalysisRows({ rows }: { rows: AnalysisRow[] }) {
  return (
    <section className="rounded-2xl bg-card p-6 shadow-lg shadow-black/30">
      <h2 className="mb-4 text-base font-semibold text-card-foreground">How this was determined</h2>
      <ul className="flex flex-col divide-y divide-border">
        {rows.map((row) => {
          const Icon = iconMap[row.icon];
          return (
            <li key={row.id} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
              <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconBg[row.icon]}`}>
                <Icon className="size-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-card-foreground">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.summary}</p>
              </div>
              <p className={`shrink-0 text-sm font-semibold ${toneClasses[row.valueTone]}`}>{row.value}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}