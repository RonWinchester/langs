import { initTRPC } from "@trpc/server";
import _ from "lodash";

const trpc = initTRPC.create();

const cards = _.times(100, (i) => ({
    id: i + 1,
    theme: `Theme ${i + 1}`,
    leftWords: _.times(10, (j) => ({
        id: j + 1,
        text: `Русское слово ${j + 1}`,
    })),
    rightWords: _.times(10, (j) => ({
        id: j + 1,
        text: `English word ${j + 1}`,
    })),
}));

export const trpcRouter = trpc.router({
    getCards: trpc.procedure.query(() => {
        return {
            cards: cards.map((card) => _.pick(card, ["id", "theme"])),
        };
    }),
});

export type TrpcRouter = typeof trpcRouter;
