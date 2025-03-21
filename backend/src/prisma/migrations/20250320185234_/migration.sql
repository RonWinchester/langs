-- CreateTable
CREATE TABLE "Words" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "Words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardPairs" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER NOT NULL,
    "leftWordId" INTEGER NOT NULL,
    "rightWordId" INTEGER NOT NULL,

    CONSTRAINT "CardPairs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Words_text_key" ON "Words"("text");

-- AddForeignKey
ALTER TABLE "CardPairs" ADD CONSTRAINT "CardPairs_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardPairs" ADD CONSTRAINT "CardPairs_leftWordId_fkey" FOREIGN KEY ("leftWordId") REFERENCES "Words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardPairs" ADD CONSTRAINT "CardPairs_rightWordId_fkey" FOREIGN KEY ("rightWordId") REFERENCES "Words"("id") ON DELETE CASCADE ON UPDATE CASCADE;
