import { z } from "zod";

export const updateUserInput = z.object({
    name: z.string().min(2),
    currentPassword: z.string().min(5).optional(),
    newPassword: z.string().min(5).optional(),
}); 