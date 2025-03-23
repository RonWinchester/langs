import { type inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { type Express } from "express";

import { type TrpcRouter } from "../router";
import { ExpressRequest } from "../utils/types";

import { AppContext } from "./cts";

const getCreateTrpcContext = (appContext: AppContext) => ({req}: trpcExpress.CreateExpressContextOptions) => (
    {
        ...appContext,
        user:(req as ExpressRequest).user || null
    }
)

type TrpcContext = inferAsyncReturnType<ReturnType<typeof getCreateTrpcContext>>

export const trpc = initTRPC.context<TrpcContext>().create();

export const applyTrpcToApp = (express: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
    express.use(
        "/trpc",
        trpcExpress.createExpressMiddleware({
            router: trpcRouter,
            createContext: getCreateTrpcContext(appContext),
        }),
    );
}