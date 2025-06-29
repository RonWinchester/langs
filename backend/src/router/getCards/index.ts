import _ from "lodash";

import { trpc } from "../../lib/trpc";

import { getCardsInput } from "./input";

export const getCardsTrpcRoute = trpc.procedure
    .input(getCardsInput)
    .query(async ({ ctx, input }) => {
        const cards = await ctx.prisma.cards.findMany({
            select: {
                id: true,
                theme: true,
                title: true,
                description: true,
                author: {
                    select: {
                        id: true,
                    },
                },
                _count: {
                    select: {
                        cardsLikes: true,
                    },
                },
                cardsLikes: {
                    where: {
                        userId: ctx.user?.id,
                    },
                },
            },
            orderBy: [
                {
                    createdAt: "desc",
                },
                {
                    id: "desc",
                },
            ],
            cursor: input.cursor ? { id: input.cursor } : undefined,
            take: input.limit + 1,
        });

        if (!cards) {
            throw new Error("Карточки не найдены");
        }

        const nextCards = cards.at(input.limit);
        const nextCursor = nextCards?.id;
        const currentCards = cards.slice(0, input.limit);

        const cardsWithLikes = currentCards.map((card) => ({
            ..._.omit(card, ["_count"]),
            likesCount: card._count.cardsLikes,
            isLiked: card.cardsLikes.length > 0,
        }));

        return { cards: cardsWithLikes, nextCursor };
    });
