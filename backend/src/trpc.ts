import { initTRPC } from "@trpc/server";

const trpc = initTRPC.create();

const langs = [
    {
        id: 1,
        name: "English",
    }
]

export const trpcRouter = trpc.router(
    {
        getLangs: trpc.procedure.query(() => {
            return langs;
        }),
    }
);

export type TrpcRouter = typeof trpcRouter