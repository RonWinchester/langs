import { trpc } from "../../lib/trpc";

import { createCardInput } from "./input";

export const createCardTrpcRoute = trpc.procedure
    .input(createCardInput)
    .mutation(async ({ ctx, input }) => {
        if(!ctx.user) {
            throw new Error("Вы не авторизованы");
        }
        const existingCard = await ctx.prisma.cards.findUnique({
            where: {
                theme: input.theme,
            },
        });

        if (existingCard) {
            throw new Error("Карточка с таким названием уже существует");
        }
        return await ctx.prisma.cards.create({
            data: input,
        });
    });
