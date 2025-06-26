import { z } from "zod";

export const getCardsInput = z.object({
    cursor: z.number().optional(),
    limit: z.number().min(1).max(100).default(10),
});
