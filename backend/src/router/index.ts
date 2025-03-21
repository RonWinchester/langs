import { trpc } from "../lib/trpc";

import { createCardTrpcRoute } from "./createCard";
import { createUserTrpcRoute } from "./createUser";
import { createWordsTrpcRoute } from "./createWords";
import { getCardTrpcRoute } from "./getCard";
import { getCardsTrpcRoute } from "./getCards";

export const trpcRouter = trpc.router({
    getCards: getCardsTrpcRoute,
    getCard: getCardTrpcRoute,
    createCard: createCardTrpcRoute,
    createWord: createWordsTrpcRoute,
    createUser: createUserTrpcRoute
});

export type TrpcRouter = typeof trpcRouter;