import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { trpc } from "../lib/trpc";

import { createCardTrpcRoute } from "./createCard";
import { createThemeTrpcRoute } from "./createTheme";
import { createUserTrpcRoute } from "./createUser";
import { createWordsTrpcRoute } from "./createWords";
import { deleteCardTrpcRoute } from "./deleteCard";
import { getCardTrpcRoute } from "./getCard";
import { getCardsTrpcRoute } from "./getCards";
import { getThemesTrpcRoute } from "./getThemes";
import { getUserTrpcRoute } from "./getUser";
import { setCardLikeTrpcRoute } from "./setCardLike";
import { signInTrpcRoute } from "./signIn";
import { updateCardTrpcRoute } from "./updateCard";
import { updateUserTrpcRoute } from "./updateUser";

export const trpcRouter = trpc.router({
    getCards: getCardsTrpcRoute,
    getCard: getCardTrpcRoute,
    createCard: createCardTrpcRoute,
    createWord: createWordsTrpcRoute,
    createUser: createUserTrpcRoute,
    signIn: signInTrpcRoute,
    getUser: getUserTrpcRoute,
    updateCard: updateCardTrpcRoute,
    deleteCard: deleteCardTrpcRoute,
    updateUser: updateUserTrpcRoute,
    setCardLike: setCardLikeTrpcRoute,
    createTheme: createThemeTrpcRoute,
    getThemes: getThemesTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
