export type VerdictTier = "Strong Buy" | "Buy" | "Hold" | "Caution" | "Avoid";

const tierStyles: Record<VerdictTier, string> = {
  "Strong Buy": "bg-primary/15 text-primary",
  Buy: "bg-emerald-400/10 text-emerald-300/90",
  Hold: "bg-white/8 text-muted-foreground",
  Caution: "bg-amber-400/10 text-amber-300/90",
  Avoid: "bg-destructive/10 text-destructive",
};

export function VerdictBadge({ tier }: { tier: VerdictTier }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-4 ${tierStyles[tier]}`}>
      {tier}
    </span>
  );
}