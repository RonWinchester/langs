
import { trpc } from "../../lib/trpc";
import { getPassword } from "../../utils";

import { createUserInput } from "./validation";

export const createUserTrpcRoute = trpc.procedure
    .input(createUserInput)
    .mutation(async ({ ctx, input }) => {
        const existingUser = await ctx.prisma.user.findUnique({
            where: {
                name: input.name,
            },
        });

        if (existingUser) {
            throw new Error("Пользователь с таким названием уже существует");
        }
        await ctx.prisma.user.create({
            data: {
                name: input.name,
                password: getPassword(input.password),
            },
        });
    });