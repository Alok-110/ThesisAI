-- CreateTable
CREATE TABLE "Research" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "confidenceScore" INTEGER NOT NULL,
    "riskFactor" TEXT NOT NULL,
    "timeHorizon" TEXT NOT NULL,
    "allocationBand" TEXT NOT NULL,
    "keyDrivers" JSONB NOT NULL,
    "keyRisks" JSONB NOT NULL,
    "agentTrace" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Research_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Research_userId_idx" ON "Research"("userId");

-- AddForeignKey
ALTER TABLE "Research" ADD CONSTRAINT "Research_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
