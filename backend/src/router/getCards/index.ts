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

        return { cards: currentCards, nextCursor };
    });
