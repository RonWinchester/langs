import { trpc } from "../../lib/trpc";

import { createThemeInput } from "./input";

export const createThemeTrpcRoute = trpc.procedure
    .input(createThemeInput)
    .mutation(async ({ ctx, input }) => {
        if (!ctx.user) {
            throw new Error("Вы не авторизованы");
        }

        const existingTheme = await ctx.prisma.theme.findUnique({
            where: { name: input.name },
        });

        if (existingTheme) {
            return existingTheme;
        }

        return await ctx.prisma.theme.create({
            data: { name: input.name },
        });
    });
