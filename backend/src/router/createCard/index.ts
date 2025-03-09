import { trpc } from "../../lib/trpc";

import { createCardInput } from "./input";

export const createCardTrpcRoute = trpc.procedure
    .input(createCardInput)
    .mutation(({ ctx, input }) => {
        return ctx.prisma.cards.create({
            data: input,
        });
    });
