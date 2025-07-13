/*
  Warnings:

  - You are about to drop the column `units` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Return` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Partners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `comment` on table `Buy` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `time` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `time` on the `Contract` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `time` on the `Debt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `Partners` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `comment` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `paymentType` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `unit` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `comment` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comment` on table `Salary` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('OWNER', 'STAFF');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('SELLER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "USER_STATUS" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "UNIT_TYPE" AS ENUM ('KILOGRAM', 'LITER', 'SQUARE_METER', 'PIECE');

-- CreateEnum
CREATE TYPE "PAYMENT_TYPE" AS ENUM ('CASH', 'CARD');

-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('IN', 'OUT');

-- AlterTable
ALTER TABLE "Buy" ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "buyPrice" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "comment" SET NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT,
DROP COLUMN "time",
ADD COLUMN     "time" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Contract" ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "sellPrice" SET DATA TYPE DECIMAL(65,30),
DROP COLUMN "time",
ADD COLUMN     "time" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Debt" ALTER COLUMN "total" SET DATA TYPE DECIMAL(65,30),
DROP COLUMN "time",
ADD COLUMN     "time" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Partners" ALTER COLUMN "balance" DROP NOT NULL,
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(65,30),
DROP COLUMN "role",
ADD COLUMN     "role" "ROLE" NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "comment" SET NOT NULL,
DROP COLUMN "paymentType",
ADD COLUMN     "paymentType" "PAYMENT_TYPE" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "TYPE" NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "units",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "unit" "UNIT_TYPE" NOT NULL,
ALTER COLUMN "sellPrice" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "buyPrice" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "comment" SET NOT NULL;

-- AlterTable
ALTER TABLE "Salary" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "comment" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "status" "USER_STATUS" NOT NULL DEFAULT 'INACTIVE',
ALTER COLUMN "balance" DROP NOT NULL,
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(65,30),
DROP COLUMN "role",
ADD COLUMN     "role" "USER_ROLE" NOT NULL DEFAULT 'STAFF';

-- DropTable
DROP TABLE "Return";

-- DropEnum
DROP TYPE "Partners_Role";

-- DropEnum
DROP TYPE "Payment_Type";

-- DropEnum
DROP TYPE "Type";

-- DropEnum
DROP TYPE "Units_Type";

-- DropEnum
DROP TYPE "User_Role";

-- DropEnum
DROP TYPE "User_Status";

-- CreateTable
CREATE TABLE "ReturnedProducts" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "isNew" BOOLEAN NOT NULL,
    "contractId" TEXT NOT NULL,

    CONSTRAINT "ReturnedProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partners_phone_key" ON "Partners"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partners" ADD CONSTRAINT "Partners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_debtId_fkey" FOREIGN KEY ("debtId") REFERENCES "Debt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buy" ADD CONSTRAINT "Buy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buy" ADD CONSTRAINT "Buy_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buy" ADD CONSTRAINT "Buy_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnedProducts" ADD CONSTRAINT "ReturnedProducts_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
