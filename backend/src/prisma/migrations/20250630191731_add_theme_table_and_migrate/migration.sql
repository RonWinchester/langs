-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateUniqueIndex
CREATE UNIQUE INDEX "Theme_name_key" ON "Theme"("name");

-- Создать темы из существующих карточек
INSERT INTO "Theme" (name, "createdAt")
SELECT DISTINCT theme, CURRENT_TIMESTAMP
FROM "Cards"
WHERE theme IS NOT NULL AND theme != '';

-- Добавить временную колонку themeId
ALTER TABLE "Cards" ADD COLUMN "themeId" INTEGER;

-- Заполнить themeId на основе существующих тем
UPDATE "Cards" 
SET "themeId" = (
    SELECT "Theme".id 
    FROM "Theme" 
    WHERE "Theme".name = "Cards".theme
)
WHERE theme IS NOT NULL;

-- Сделать themeId NOT NULL
ALTER TABLE "Cards" ALTER COLUMN "themeId" SET NOT NULL;

-- Удалить старое поле theme
ALTER TABLE "Cards" DROP COLUMN "theme";

-- Добавить foreign key constraint
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;