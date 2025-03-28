import _ from "lodash";

import { trpc } from "../../lib/trpc";

export const getCardsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
    const cards = await ctx.prisma.cards.findMany({
        select: {
            id: true,
            theme: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return { cards };
});
