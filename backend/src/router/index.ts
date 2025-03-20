import { trpc } from "../lib/trpc";

import { createCardTrpcRoute } from "./createCard";
import { createWordsTrpcRoute } from "./createWords";
import { getCardTrpcRoute } from "./getCard";
import { getCardsTrpcRoute } from "./getCards";

export const trpcRouter = trpc.router({
    getCards: getCardsTrpcRoute,
    getCard: getCardTrpcRoute,
    createCard: createCardTrpcRoute,
    createWord: createWordsTrpcRoute
});

export type TrpcRouter = typeof trpcRouter;