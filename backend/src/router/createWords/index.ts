import { trpc } from "../../lib/trpc";

import { createWordsInput } from "./input";

export const createWordsTrpcRoute = trpc.procedure
    .input(createWordsInput)
    .mutation(({ ctx, input }) => {
        return ctx.prisma.word.create({
            data: {
                cardId: input.cardId,
                original: input.original,
                translation: input.translation,
            },
        });
    });
