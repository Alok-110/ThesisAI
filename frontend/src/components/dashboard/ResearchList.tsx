import { VerdictBadge } from "./VerdictBadge";
import type { VerdictTier } from "./VerdictBadge";


export type ResearchRun = {
  id: string;
  companyName: string;
  tier: VerdictTier;
  confidenceScore: number;
  createdAt: string;
};

function relativeTime(isoString: string): string {
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months === 1 ? "" : "s"} ago`;
}

export function ResearchList({
  runs,
  onSelect,
}: {
  runs: ResearchRun[];
  onSelect: (run: ResearchRun) => void;
}) {
  if (runs.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        No research yet — search a company above to get started.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border/60">
      {runs.map((run) => (
        <li key={run.id}>
          <button
            type="button"
            onClick={() => onSelect(run)}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-white/[0.03] focus-visible:bg-white/[0.03] focus-visible:outline-none"
          >
            <span className="min-w-0 flex-1 truncate text-sm text-foreground">{run.companyName}</span>
            <VerdictBadge tier={run.tier} />
            <span className="w-11 shrink-0 text-right font-mono text-[13px] text-foreground/80 tabular-nums">
              {run.confidenceScore}%
            </span>
            <span className="hidden w-28 shrink-0 text-right text-[13px] text-muted-foreground sm:block">
              {relativeTime(run.createdAt)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}