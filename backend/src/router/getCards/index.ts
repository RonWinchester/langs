import _ from "lodash";

import { cards } from "../../lib/cards";
import { trpc } from "../../lib/trpc";

export const getCardsTrpcRoute = trpc.procedure.query(() => {
    return {
        cards: cards.map((card) => _.pick(card, ["id", "theme"])),
    };
});
