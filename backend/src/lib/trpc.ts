import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { type Express } from "express";

import { type TrpcRouter } from "../router";

import { AppContext } from "./cts";


export const trpc = initTRPC.context<AppContext>().create();

export const applyTrpcToApp = (express: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
    express.use(
        "/trpc",
        trpcExpress.createExpressMiddleware({
            router: trpcRouter,
            createContext: () => appContext,
        }),
    );
}