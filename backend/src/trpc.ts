import { initTRPC } from "@trpc/server";
import _ from "lodash";
import { z } from "zod";

const trpc = initTRPC.create();

const cards = _.times(100, (i) => ({
    id: i ,
    theme: `Theme ${i }`,
    leftWords: _.shuffle(_.times(10, (j) => ({
        id: j + 1,
        text: `Русское слово ${j + 1}`,
    }))),
    rightWords: _.shuffle(_.times(10, (j) => ({
        id: j + 1,
        text: `English word ${j + 1}`,
    }))),
}));

export const trpcRouter = trpc.router({
    getCards: trpc.procedure.query(() => {
        return {
            cards: cards.map((card) => _.pick(card, ["id", "theme"])),
        };
    }),
    getCard: trpc.procedure.input(z.object({ id: z.number() })).query(({ input }) => {
        const card = cards.find((card) => card.id === input.id);
        return card || null;
    })
});

export type TrpcRouter = typeof trpcRouter;
