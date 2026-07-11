import { RotateCw } from "lucide-react";

export type VerdictTier = "Strong Buy" | "Buy" | "Hold" | "Caution" | "Avoid";

const tierStyles: Record<VerdictTier, string> = {
  "Strong Buy": "bg-success/15 text-success",
  Buy: "bg-success/15 text-success",
  Hold: "bg-secondary text-muted-foreground",
  Caution: "bg-warning/15 text-warning",
  Avoid: "bg-destructive/15 text-destructive",
};

export function VerdictHeader({
  company,
  tier,
  onRerun,
  rerunning,
}: {
  company: string;
  tier: VerdictTier;
  onRerun?: () => void;
  rerunning?: boolean;
}) {
  return (
    <header className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">{company}</h1>
        <span className={`inline-flex items-center rounded-full px-5 py-2 text-base font-bold ${tierStyles[tier]}`}>
          {tier}
        </span>
      </div>
      {onRerun && (
        <button
          onClick={onRerun}
          disabled={rerunning}
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent disabled:opacity-50"
        >
          <RotateCw className={`size-4 ${rerunning ? "animate-spin" : ""}`} />
          {rerunning ? "Re-running..." : "Re-run analysis"}
        </button>
      )}
    </header>
  );
}