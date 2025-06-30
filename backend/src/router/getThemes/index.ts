import { trpc } from "../../lib/trpc";

export const getThemesTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.theme.findMany({
        select: {
            id: true,
            name: true,
            _count: {
                select: {
                    cards: true,
                },
            },
        },
        orderBy: {
            cards: {
                _count: "desc",
            },
        },
    });
});
