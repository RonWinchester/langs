import { trpc } from "../../lib/trpc";

import { updateCardInput } from "./validate";

export const updateCardTrpcRoute = trpc.procedure
    .input(updateCardInput)
    .mutation(async ({ ctx, input }) => {
        const { id, ...cardInput } = input;
        const { theme, description, pairs } = cardInput;

        if (!ctx.user) {
            throw new Error("Вы не авторизованы");
        }

        const card = await ctx.prisma.cards.findUnique({
            where: { id },
        });

        if (!card) {
            throw new Error("Карточка не найдена");
        }

        if (card.authorId !== ctx.user.id) {
            throw new Error("Вы не можете редактировать эту карточку");
        }

        if (input.theme && card.theme !== input.theme) {
            const existingCard = await ctx.prisma.cards.findUnique({
                where: { theme: input.theme },
            });

            if (existingCard) {
                throw new Error("Карточка с таким названием уже существует");
            }
        }

        const updatedCard = await ctx.prisma.cards.update({
            where: { id },
            data: { theme, description },
        });

        if (pairs) {
            for (const pair of pairs) {
                if (pair.deleted && pair.id) {
                    await ctx.prisma.word.deleteMany({
                        where: { id: pair.id, cardId: id },
                    });
                } else if (pair.id) {
                    await ctx.prisma.word.update({
                        where: { id: pair.id, cardId: id },
                        data: {
                            original: pair.original,
                            translation: pair.translation,
                        },
                    });
                } else {
                    await ctx.prisma.word.create({
                        data: {
                            cardId: id,
                            original: pair.original,
                            translation: pair.translation,
                        },
                    });
                }
            }
        }

        return updatedCard;
    });
