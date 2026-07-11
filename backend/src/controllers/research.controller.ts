import { Response } from "express";
import { z } from "zod";
import { investmentAgent } from "../agent/graph";
import { AuthRequest } from "../middlewares/verifyJWT";
import { prisma } from "../config/db";

const researchSchema = z.object({
  companyName: z.string().min(1),
});

export async function runResearch(req: AuthRequest, res: Response) {
  const parsed = researchSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { companyName } = parsed.data;

  try {
    const result = await investmentAgent.invoke({ companyName });
    const { verdict, newsData, sentiment, risk } = result;

    const saved = await prisma.research.create({
      data: {
        userId: req.userId!,
        companyName,
        tier: verdict.tier,
        confidenceScore: verdict.confidenceScore,
        riskFactor: verdict.riskFactor,
        timeHorizon: verdict.timeHorizon,
        allocationBand: verdict.allocationBand,
        keyDrivers: verdict.keyDrivers,
        keyRisks: verdict.keyRisks,
        agentTrace: { newsData, sentiment, risk },
      },
    });

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Agent failed to produce a research report" });
  }
}

export async function getHistory(req: AuthRequest, res: Response) {
  const history = await prisma.research.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "desc" },
  });
  res.json(history);
}

export async function getResearchById(req: AuthRequest, res: Response) {
  const research = await prisma.research.findFirst({
    where: { id: req.params.id, userId: req.userId },
  });
  if (!research) return res.status(404).json({ error: "Not found" });
  res.json(research);
}