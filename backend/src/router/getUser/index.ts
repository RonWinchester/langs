import _ from "lodash";

import { trpc } from "../../lib/trpc";

export const getUserTrpcRoute = trpc.procedure.query(({ ctx }) => {
    return {
        user: ctx.user && _.pick(ctx.user, ["id", "name"]),
    };
});
