-- DropForeignKey
ALTER TABLE "PurchasedContact" DROP CONSTRAINT "PurchasedContact_serviceId_fkey";

-- AlterTable
ALTER TABLE "PurchasedContact" ADD COLUMN     "jobId" BIGINT,
ALTER COLUMN "serviceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PurchasedContact" ADD CONSTRAINT "PurchasedContact_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedContact" ADD CONSTRAINT "PurchasedContact_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
