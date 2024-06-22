/*
  Warnings:

  - You are about to drop the column `Titel` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the column `isFavourite` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `titel` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_genreId_fkey";

-- DropIndex
DROP INDEX "Books_genreId_key";

-- AlterTable
ALTER TABLE "Books" DROP COLUMN "Titel",
DROP COLUMN "genreId",
DROP COLUMN "isFavourite",
ADD COLUMN     "titel" TEXT NOT NULL;

-- DropTable
DROP TABLE "Genre";
