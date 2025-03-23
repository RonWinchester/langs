
import { trpc } from "../../lib/trpc";
import { getPassword } from "../../utils";

import { signInInput } from "./validation";

export const signInTrpcRoute = trpc.procedure
    .input(signInInput)
    .mutation(async ({ ctx, input }) => {
        const existingUser = await ctx.prisma.user.findFirst({
            where: {
                name: input.name,
                password: getPassword(input.password),
            },
        });

        if (!existingUser) {
            throw new Error("Не правильное имя пользователя или пароль");
        }

        return true
    });