import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { ResearchSearch } from "../components/dashboard/ResearchSearch";
import { ResearchList, type ResearchRun } from "../components/dashboard/ResearchList";

export default function Dashboard() {
  const [runs, setRuns] = useState<ResearchRun[]>([]);
  const [pending, setPending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/research")
      .then((res) => setRuns(res.data))
      .catch(() => setRuns([]))
      .finally(() => setLoadingHistory(false));
  }, []);

  async function handleSearch(query: string) {
    setPending(true);
    try {
      const res = await api.post("/research", { companyName: query });
      setRuns((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("Research request failed:", err);
    } finally {
      setPending(false);
    }
  }

  function handleSelect(run: ResearchRun) {
    navigate(`/report/${run.id}`);
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <div className="mx-auto w-full max-w-[720px] px-6 pb-24">
        <section className="pt-[10vh] pb-16">
          <h1 className="text-center text-xl font-medium tracking-tight text-foreground">
            What do you want to research?
          </h1>
          <div className="mt-6">
            <ResearchSearch pending={pending} onSearch={handleSearch} />
          </div>
        </section>
        <section aria-label="Your research">
          <div className="flex items-baseline justify-between border-b border-border/60 px-3 pb-2.5">
            <h2 className="text-[13px] font-medium text-muted-foreground">Your research</h2>
            {runs.length > 0 && (
              <span className="font-mono text-xs text-muted-foreground/70 tabular-nums">{runs.length}</span>
            )}
          </div>
          {loadingHistory ? (
            <p className="py-16 text-center text-sm text-muted-foreground">Loading...</p>
          ) : (
            <ResearchList runs={runs} onSelect={handleSelect} />
          )}
        </section>
      </div>
    </div>
  );
}