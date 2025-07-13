/*
  Warnings:

  - You are about to alter the column `balance` on the `Partners` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Partners" ALTER COLUMN "balance" SET DATA TYPE DOUBLE PRECISION;
