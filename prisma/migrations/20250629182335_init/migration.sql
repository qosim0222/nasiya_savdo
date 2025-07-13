/*
  Warnings:

  - Changed the type of `role` on the `Partners` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PARTNERS_ROLE" AS ENUM ('SELLER', 'CUSTOMER');

-- AlterTable
ALTER TABLE "Partners" DROP COLUMN "role",
ADD COLUMN     "role" "PARTNERS_ROLE" NOT NULL;

-- DropEnum
DROP TYPE "ROLE";
