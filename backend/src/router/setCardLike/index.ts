import { trpc } from "../../lib/trpc";

import { setCardLikeInput } from "./input";

export const setCardLikeTrpcRoute = trpc.procedure
    .input(setCardLikeInput)
    .mutation(async ({ ctx, input }) => {
        const { cardId, isLike } = input;
        const userId = ctx.user?.id;

        if (!userId) {
            throw new Error("Пользователь не найден");
        }

        const card = await ctx.prisma.cards.findUnique({
            where: { id: cardId },
        });

        if (!card) {
            throw new Error("Карточка не найдена");
        }

        if (isLike) {
            await ctx.prisma.cardsLikes.upsert({
                where: { cardId_userId: { cardId, userId } },
                update: {},
                create: { cardId, userId },
            });
        } else {
            await ctx.prisma.cardsLikes.delete({
                where: { cardId_userId: { cardId, userId } },
            });
        }

        const likesCount = await ctx.prisma.cardsLikes.count({
            where: { cardId },
        });

        return { likesCount, isLike, cardId };
    });
