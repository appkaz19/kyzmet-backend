/*
  Warnings:

  - You are about to drop the column `videos` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `videos` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "videos";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "videos";
