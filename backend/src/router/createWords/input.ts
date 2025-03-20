import { z } from "zod";

export const createWordsInput = z.object({
    cardId: z.number(),
    original: z.string(),
    translation: z.string(),
});
