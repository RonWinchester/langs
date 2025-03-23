import {z} from "zod";

export const zEnv = z.object({
    VITE_BACKEND_TRPC_URL: z.string().trim().min(1),
});

export const env = zEnv.parse(import.meta.env);