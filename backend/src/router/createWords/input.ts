import { z } from "zod";

export const createWordsInput = z.object({
    cardId: z.number(),
    words: z
        .array(
            z.object({
                original: z.string(),
                translation: z.string(),
            }),
        )
        .min(1),
});
