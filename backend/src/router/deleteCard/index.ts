import { trpc } from "../../lib/trpc";

import { deleteCardInput } from "./input";

export const deleteCardTrpcRoute = trpc.procedure
    .input(deleteCardInput)
    .mutation(async ({ ctx, input }) => {
        if (!ctx.user) {
            throw new Error("Вы не авторизованы");
        }
        const card = await ctx.prisma.cards.findUnique({
            where: {
                id: input.id,
            },
        });

        if (!card) {
            throw new Error("Карточка не найдена");
        }

        if (card.authorId !== ctx.user.id) {
            throw new Error("Вы не можете удалить эту карточку");
        }

        return await ctx.prisma.cards.delete({
            where: {
                id: input.id,
            },
        });
    });
