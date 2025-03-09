-- CreateTable
CREATE TABLE "Cards" (
    "id" SERIAL NOT NULL,
    "theme" TEXT NOT NULL,
    "leftWords" JSONB NOT NULL,
    "rightWords" JSONB NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cards_theme_key" ON "Cards"("theme");
