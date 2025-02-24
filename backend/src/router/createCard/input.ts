import { z } from "zod";

export const createCardInput = z.object({
    theme: z.string().min(3),
    description: z.string().min(10),
});
