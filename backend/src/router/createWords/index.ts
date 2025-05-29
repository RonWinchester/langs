import { trpc } from "../../lib/trpc";

import { createWordsInput } from "./input";

export const createWordsTrpcRoute = trpc.procedure
  .input(createWordsInput)
  .mutation(async ({ ctx, input }) => {
    const { cardId, words } = input;

    await ctx.prisma.word.createMany({
      data: words.map((word) => ({
        cardId,
        original: word.original,
        translation: word.translation,
      })),
      skipDuplicates: true,
    });

    return { success: true };
  });
