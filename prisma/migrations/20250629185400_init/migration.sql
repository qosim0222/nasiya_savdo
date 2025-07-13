/*
  Warnings:

  - You are about to drop the `ReturnedProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReturnedProducts" DROP CONSTRAINT "ReturnedProducts_contractId_fkey";

-- DropTable
DROP TABLE "ReturnedProducts";

-- CreateTable
CREATE TABLE "Return" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "isNew" BOOLEAN NOT NULL,
    "contractId" TEXT NOT NULL,

    CONSTRAINT "Return_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Return" ADD CONSTRAINT "Return_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
