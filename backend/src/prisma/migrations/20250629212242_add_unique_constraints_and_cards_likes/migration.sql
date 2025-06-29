/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cards" ALTER COLUMN "title" DROP DEFAULT;

-- CreateTable
CREATE TABLE "CardsLikes" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CardsLikes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardsLikes_cardId_userId_key" ON "CardsLikes"("cardId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cards_title_key" ON "Cards"("title");

-- AddForeignKey
ALTER TABLE "CardsLikes" ADD CONSTRAINT "CardsLikes_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsLikes" ADD CONSTRAINT "CardsLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
