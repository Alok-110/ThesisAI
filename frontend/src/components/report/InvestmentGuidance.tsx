interface GuidanceProps {
  tier: string;
  confidenceScore: number;
  riskFactor: string;
  timeHorizon: string;
}

function buildGuidance({ tier, confidenceScore, riskFactor, timeHorizon }: GuidanceProps): string {
  const action =
    tier === "Strong Buy" || tier === "Buy"
      ? "This may be a reasonable entry point"
      : tier === "Hold"
      ? "Consider holding off on new entry"
      : "Consider avoiding new entry at this time";

  const confidenceNote =
    confidenceScore >= 80
      ? "with high confidence in the underlying signals"
      : confidenceScore >= 60
      ? "with moderate confidence — worth monitoring for confirmation"
      : "though confidence is limited — treat this as a starting point for further research, not a conclusion";

  const riskNote =
    riskFactor === "High" || riskFactor === "Volatile"
      ? `Given the ${riskFactor.toLowerCase()} risk profile, position sizing should be conservative.`
      : `Risk is assessed as ${riskFactor.toLowerCase()}, consistent with the suggested allocation.`;

  return `${action}, ${confidenceNote}. This assessment reflects a ${timeHorizon.toLowerCase()} view. ${riskNote}`;
}

export function InvestmentGuidance(props: GuidanceProps) {
  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <h2 className="mb-2 text-sm font-semibold text-foreground">Investment guidance</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">{buildGuidance(props)}</p>
    </div>
  );
}