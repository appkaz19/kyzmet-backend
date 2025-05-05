/*
  Warnings:

  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "birthdate" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "locationId" TEXT,
ADD COLUMN     "nickname" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
