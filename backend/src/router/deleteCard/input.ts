import { z } from "zod";

export const deleteCardInput = z.object({
    id: z.number(),
});
