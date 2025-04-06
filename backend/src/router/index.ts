import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { trpc } from "../lib/trpc";

import { createCardTrpcRoute } from "./createCard";
import { createUserTrpcRoute } from "./createUser";
import { createWordsTrpcRoute } from "./createWords";
import { getCardTrpcRoute } from "./getCard";
import { getCardsTrpcRoute } from "./getCards";
import { getUserTrpcRoute } from "./getUser";
import { signInTrpcRoute } from "./signIn";
import { updateCardTrpcRoute } from "./updateCard";

export const trpcRouter = trpc.router({
    getCards: getCardsTrpcRoute,
    getCard: getCardTrpcRoute,
    createCard: createCardTrpcRoute,
    createWord: createWordsTrpcRoute,
    createUser: createUserTrpcRoute,
    signIn: signInTrpcRoute,
    getUser: getUserTrpcRoute,
    updateCard: updateCardTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;