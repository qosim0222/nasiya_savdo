/*
  Warnings:

  - You are about to alter the column `quantity` on the `Buy` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `buyPrice` on the `Buy` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Buy" ALTER COLUMN "quantity" SET DATA TYPE INTEGER,
ALTER COLUMN "buyPrice" SET DATA TYPE DOUBLE PRECISION;
