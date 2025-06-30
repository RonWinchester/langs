import { z } from "zod";

export const createCardInput = z.object({
    title: z.string().min(3),
    themeId: z.number().int().positive("Выберите тему"),
    description: z.string().min(10)
});
