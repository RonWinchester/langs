import { z } from "zod";

export const setCardLikeInput = z.object({
    cardId: z.number(),
    isLike: z.boolean(),
});