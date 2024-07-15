/*
  Warnings:

  - The `rating` column on the `Books` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Books" DROP COLUMN "rating",
ADD COLUMN     "rating" DECIMAL(65,30) NOT NULL DEFAULT 0.00;
