/*
  Warnings:

  - You are about to drop the column `name` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Region` table. All the data in the column will be lost.
  - Added the required column `lat` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "City_regionId_name_key";

-- DropIndex
DROP INDEX "Region_name_key";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "name",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Region" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "RegionTranslation" (
    "id" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RegionTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CityTranslation" (
    "id" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CityTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegionTranslation_regionId_language_key" ON "RegionTranslation"("regionId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "CityTranslation_cityId_language_key" ON "CityTranslation"("cityId", "language");

-- AddForeignKey
ALTER TABLE "RegionTranslation" ADD CONSTRAINT "RegionTranslation_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityTranslation" ADD CONSTRAINT "CityTranslation_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
