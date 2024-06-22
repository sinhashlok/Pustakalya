-- CreateTable
CREATE TABLE "Books" (
    "id" INTEGER NOT NULL,
    "eTag" INTEGER NOT NULL,
    "Titel" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "isFavourite" TEXT NOT NULL,
    "authour" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Books_eTag_key" ON "Books"("eTag");
