/*
  Warnings:

  - You are about to drop the column `authour` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `Books` table. All the data in the column will be lost.
  - The `isFavourite` column on the `Books` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[genreId]` on the table `Books` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `genreId` to the `Books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genreType` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" DROP COLUMN "authour",
DROP COLUMN "genre",
ADD COLUMN     "author" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "genreId" INTEGER NOT NULL,
ADD COLUMN     "genreType" TEXT NOT NULL,
ADD COLUMN     "rating" TEXT NOT NULL DEFAULT 'N/A',
DROP COLUMN "isFavourite",
ADD COLUMN     "isFavourite" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "price" SET DEFAULT 200;

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Books_genreId_key" ON "Books"("genreId");

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
