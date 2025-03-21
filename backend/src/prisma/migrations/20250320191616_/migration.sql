/*
  Warnings:

  - You are about to drop the `CardPairs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Words` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CardPairs" DROP CONSTRAINT "CardPairs_cardId_fkey";

-- DropForeignKey
ALTER TABLE "CardPairs" DROP CONSTRAINT "CardPairs_leftWordId_fkey";

-- DropForeignKey
ALTER TABLE "CardPairs" DROP CONSTRAINT "CardPairs_rightWordId_fkey";

-- DropTable
DROP TABLE "CardPairs";

-- DropTable
DROP TABLE "Words";

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER NOT NULL,
    "original" TEXT NOT NULL,
    "translation" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
