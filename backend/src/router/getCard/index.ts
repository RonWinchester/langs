import { z } from "zod";

import { cards } from "../../lib/cards";
import { trpc } from "../../lib/trpc";

export const getCardTrpcRoute = trpc.procedure.input(z.object({ id: z.number() })).query(({ input }) => {
    const card = cards.find((card) => card.id === input.id);
    return card || null;
})