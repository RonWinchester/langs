import _ from "lodash";

import { trpc } from "../../lib/trpc";

export const getCardsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
    const cards = await ctx.prisma.cards.findMany({
        select: {
            id: true,
            theme: true,
            author: {
                select: {
                    id: true,
                },
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    if(!cards) {
        throw new Error("Карточки не найдены");
    }

    return { cards };
});
