import { trpc } from "../lib/trpc";

import { createCardTrpcRoute } from "./createCard";
import { getCardTrpcRoute } from "./getCard";
import { getCardsTrpcRoute } from "./getCards";

export const trpcRouter = trpc.router({
    getCards: getCardsTrpcRoute,
    getCard: getCardTrpcRoute,
    createCard: createCardTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;