import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { VerdictHeader, type VerdictTier } from "../components/report/VerdictHeader";
import { StatCards } from "../components/report/StatCards";
import { DriversRisks } from "../components/report/DriversRisks";
import { AnalysisRows, type AnalysisRow } from "../components/report/AnalysisRows";
import { FundamentalsCard } from "../components/report/FundamentalsCard";
import { Sources } from "../components/report/Sources";
import { InvestmentGuidance } from "../components/report/InvestmentGuidance";

interface ResearchRecord {
  id: string;
  companyName: string;
  tier: VerdictTier;
  confidenceScore: number;
  riskFactor: "Low" | "Medium" | "High" | "Volatile";
  timeHorizon: string;
  allocationBand: string;
  keyDrivers: string[];
  keyRisks: string[];
  agentTrace: {
    newsData: { title: string; content: string; url: string }[];
    sentiment: { score: string; summary: string };
    risk: { level: string; factors: string[] };
    financials: {
      marketCap: string | null;
      peRatio: string | null;
      week52High: string | null;
      week52Low: string | null;
      sector: string | null;
      priceHistory: { date: string; close: number }[];
    } | null;
  };
}

export default function ReportView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<ResearchRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [rerunning, setRerunning] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/research/${id}`)
      .then((res) => setReport(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleRerun() {
    if (!report) return;
    setRerunning(true);
    try {
      const res = await api.post("/research", { companyName: report.companyName });
      navigate(`/report/${res.data.id}`);
    } catch {
      setRerunning(false);
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground text-sm">Loading report...</p></div>;
  }

  if (error || !report) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground text-sm">Report not found.</p></div>;
  }

  const analysisRows: AnalysisRow[] = [
    {
      id: "sentiment",
      label: "Sentiment analysis",
      summary: report.agentTrace.sentiment.summary,
      value: report.agentTrace.sentiment.score,
      valueTone: report.agentTrace.sentiment.score === "Positive" ? "positive" : report.agentTrace.sentiment.score === "Negative" ? "negative" : "neutral",
      icon: "sentiment",
    },
    {
      id: "risk",
      label: "Risk analysis",
      summary: report.agentTrace.risk.factors.join(", "),
      value: report.agentTrace.risk.level,
      valueTone: "neutral",
      icon: "risk",
    },
  ];

  return (
    <main className="px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <VerdictHeader company={report.companyName} tier={report.tier} onRerun={handleRerun} rerunning={rerunning} />
        <StatCards confidence={report.confidenceScore} risk={report.riskFactor} allocation={report.allocationBand} />

        {report.agentTrace.financials && (
          <FundamentalsCard financials={report.agentTrace.financials} />
        )}

        <InvestmentGuidance
          tier={report.tier}
          confidenceScore={report.confidenceScore}
          riskFactor={report.riskFactor}
          timeHorizon={report.timeHorizon}
        />

        <DriversRisks drivers={report.keyDrivers} risks={report.keyRisks} />
        <AnalysisRows rows={analysisRows} />
        <Sources newsData={report.agentTrace.newsData} />

        <p className="text-center text-xs text-muted-foreground/70">
          AI-generated analysis for informational purposes only, not financial advice.
        </p>
      </div>
    </main>
  );
}