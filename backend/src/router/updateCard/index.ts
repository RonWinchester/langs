import { trpc } from "../../lib/trpc";

import { updateCardInput } from "./validate";

export const updateCardTrpcRoute = trpc.procedure
    .input(updateCardInput)
    .mutation(async ({ ctx, input }) => {
        const { id, words, ...cardInput } = input;

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
            data: cardInput,
        });

        // **Обрабатываем слова**
        if (words) {
            for (const word of words) {
                if (word.deleted) {
                    await ctx.prisma.word.deleteMany({
                        where: { id: word.id, cardId: id },
                    });
                } else if (word.id) {
                    await ctx.prisma.word.update({
                        where: { id: word.id, cardId: id },
                        data: {
                            original: word.original,
                            translation: word.translation,
                        },
                    });
                } else {
                    await ctx.prisma.word.create({
                        data: {
                            cardId: id,
                            original: word.original,
                            translation: word.translation,
                        },
                    });
                }
            }
        }

        return updatedCard;
    });
