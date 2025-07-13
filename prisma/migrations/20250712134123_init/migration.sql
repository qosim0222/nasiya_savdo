/*
  Warnings:

  - You are about to drop the column `isActive` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `sellPrice` on the `Contract` table. All the data in the column will be lost.
  - You are about to alter the column `total` on the `Debt` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `time` on the `Debt` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - The `phone` column on the `Partners` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `buyPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sellPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `balance` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Added the required column `remaining` to the `Debt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPaid` to the `Debt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `balance` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_productId_fkey";

-- DropForeignKey
ALTER TABLE "Debt" DROP CONSTRAINT "Debt_contractId_fkey";

-- DropForeignKey
ALTER TABLE "Return" DROP CONSTRAINT "Return_contractId_fkey";

-- AlterTable
ALTER TABLE "Buy" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalPrice" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "isActive";

-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "productId",
DROP COLUMN "quantity",
DROP COLUMN "sellPrice",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Debt" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isClosed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "partnerId" TEXT,
ADD COLUMN     "remaining" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalPaid" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "total" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "time" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Partners" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isArchive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" JSONB,
ADD COLUMN     "pin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updateUser" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "phone",
ADD COLUMN     "phone" TEXT[],
ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "buyPrice",
DROP COLUMN "isActive",
DROP COLUMN "sellPrice",
ADD COLUMN     "craetedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "productCode" TEXT DEFAULT '',
ADD COLUMN     "totalPrice" DOUBLE PRECISION,
ALTER COLUMN "quantity" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Return" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Salary" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
ALTER COLUMN "isActive" SET DEFAULT true,
ALTER COLUMN "balance" SET NOT NULL,
ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "balance" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "ContractItem" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sellPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ContractItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReturnItem" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sellPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ReturnItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partners_phone_key" ON "Partners"("phone");

-- AddForeignKey
ALTER TABLE "Partners" ADD CONSTRAINT "Partners_updateUser_fkey" FOREIGN KEY ("updateUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractItem" ADD CONSTRAINT "ContractItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractItem" ADD CONSTRAINT "ContractItem_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Return" ADD CONSTRAINT "Return_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnItem" ADD CONSTRAINT "ReturnItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnItem" ADD CONSTRAINT "ReturnItem_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
