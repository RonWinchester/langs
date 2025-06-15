import { z } from "zod";

export const createCardInput = z.object({
    title: z.string().min(3),
    theme: z.string().min(3),
    description: z.string().min(10)
});
