import { z } from "zod";

export const createUserInput = z.object({
    name: z.string().min(2),
    password: z.string().min(5),
});
