import { z } from "zod";


export const createThemeInput = z.object({
    name: z.string()
        .min(3, "Название темы должно содержать минимум 3 символа")
        .max(20, "Название темы не должно превышать 20 символов")
        .trim()
});