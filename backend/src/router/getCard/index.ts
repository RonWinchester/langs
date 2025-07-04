import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { trpc } from "../../lib/trpc";

export const getCardTrpcRoute = trpc.procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
        const card = await ctx.prisma.cards.findUnique({
            where: { id: input.id },
            include: {
                pairs: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                cardsLikes: {
                    select: {
                        id: true,
                    },
                    where: {
                        userId: ctx.user?.id,
                    },
                },
                theme: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                _count: {
                    select: {
                        cardsLikes: true,
                    },
                },
            },
        });

        if (!card) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Карточка не найдена",
            });
        }

        const original = card.pairs.map((word) => ({
            id: word.id,
            text: word.original,
        }));
        const translation = shuffleArray(
            card.pairs.map((word) => ({ id: word.id, text: word.translation })),
        );

        return {
            theme: card.theme,
            title: card.title,
            createdAt: card.createdAt,
            original,
            translation,
            author: card.author,
            description: card.description,
            id: card.id,
            pairs: card.pairs,
            likesCount: card._count.cardsLikes,
            isLiked: card.cardsLikes.length > 0,
        };
    });

const shuffleArray = <T>(array: T[]): T[] => {
    return array.sort(() => Math.random() - 0.5);
};
