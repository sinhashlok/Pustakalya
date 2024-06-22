/*
  Warnings:

  - The primary key for the `Books` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Books" DROP CONSTRAINT "Books_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Books_pkey" PRIMARY KEY ("id");
