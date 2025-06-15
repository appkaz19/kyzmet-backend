/*
  Warnings:

  - Added the required column `expiresAt` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

UPDATE "Job" SET "expiresAt" = "createdAt" + INTERVAL '14 days' WHERE "expiresAt" IS NULL;
UPDATE "Service" SET "expiresAt" = "createdAt" + INTERVAL '14 days' WHERE "expiresAt" IS NULL;


-- CreateTable
CREATE TABLE "Tariff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "promoDays" INTEGER NOT NULL DEFAULT 0,
    "extraDays" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tariff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Job_expiresAt_idx" ON "Job"("expiresAt");

-- CreateIndex
CREATE INDEX "Service_expiresAt_idx" ON "Service"("expiresAt");
