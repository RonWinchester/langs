import { create } from "lodash";
import { z } from "zod";

import { trpc } from "../../lib/trpc";

export const getCardTrpcRoute = trpc.procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
        const card = await ctx.prisma.cards.findUnique({
            where: {
                id: input.id,
            },
            select: {
                theme: true,
                createdAt: true,
            }
        });

        return {
            ...card,
            leftWords: [{ id: 1, text: "1" }],
            rightWords: [{ id: 1, text: "1" }],
        };
    });
