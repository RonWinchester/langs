import { z } from "zod";

import { trpc } from "../../lib/trpc";

import { createCardInput } from "./input";

export const createCardTrpcRoute = trpc.procedure
    .input(createCardInput)
    .mutation(({ input }) => {
        return {
            theme: input.theme,
            description: input.description,
        };
    });
