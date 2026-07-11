import { CircleCheck, TrendingUp, TriangleAlert } from "lucide-react";

export function DriversRisks({ drivers, risks }: { drivers: string[]; risks: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <section className="rounded-2xl bg-card p-6 shadow-lg shadow-black/30">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-success/15 text-success">
            <TrendingUp className="size-4.5" />
          </div>
          <h2 className="text-base font-semibold text-card-foreground">Key Drivers</h2>
        </div>
        <ul className="flex flex-col gap-3">
          {drivers.map((driver) => (
            <li key={driver} className="flex items-start gap-2.5">
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" />
              <span className="text-sm leading-relaxed text-muted-foreground">{driver}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-card p-6 shadow-lg shadow-black/30">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-warning/15 text-warning">
            <TriangleAlert className="size-4.5" />
          </div>
          <h2 className="text-base font-semibold text-card-foreground">Key Risks</h2>
        </div>
        <ul className="flex flex-col gap-3">
          {risks.map((risk) => (
            <li key={risk} className="flex items-start gap-2.5">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning" />
              <span className="text-sm leading-relaxed text-muted-foreground">{risk}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}