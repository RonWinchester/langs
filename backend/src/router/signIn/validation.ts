import { z } from "zod";

export const signInInput = z.object({
    name: z.string().min(2),
    password: z.string().min(5),
});
