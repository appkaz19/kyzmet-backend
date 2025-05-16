/*
  Warnings:

  - Changed the type of `language` on the `CityTranslation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `language` on the `RegionTranslation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en', 'ru', 'kz', 'uz');

-- AlterTable
ALTER TABLE "CityTranslation" DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL;

-- AlterTable
ALTER TABLE "RegionTranslation" DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL;

-- CreateTable
CREATE TABLE "CategoryTranslation" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubcategoryTranslation" (
    "id" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubcategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTranslation_categoryId_language_key" ON "CategoryTranslation"("categoryId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "SubcategoryTranslation_subcategoryId_language_key" ON "SubcategoryTranslation"("subcategoryId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "CityTranslation_cityId_language_key" ON "CityTranslation"("cityId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "RegionTranslation_regionId_language_key" ON "RegionTranslation"("regionId", "language");

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubcategoryTranslation" ADD CONSTRAINT "SubcategoryTranslation_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
