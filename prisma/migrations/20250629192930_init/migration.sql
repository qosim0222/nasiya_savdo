/*
  Warnings:

  - The values [KILOGRAM,SQUARE_METER] on the enum `UNIT_TYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UNIT_TYPE_new" AS ENUM ('KG', 'LITER', 'METER', 'PIECE');
ALTER TABLE "Product" ALTER COLUMN "unit" TYPE "UNIT_TYPE_new" USING ("unit"::text::"UNIT_TYPE_new");
ALTER TYPE "UNIT_TYPE" RENAME TO "UNIT_TYPE_old";
ALTER TYPE "UNIT_TYPE_new" RENAME TO "UNIT_TYPE";
DROP TYPE "UNIT_TYPE_old";
COMMIT;
