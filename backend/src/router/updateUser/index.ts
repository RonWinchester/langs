import { trpc } from "../../lib/trpc";
import { getPassword } from "../../utils/getPassword";

import { updateUserInput } from "./validation";

export const updateUserTrpcRoute = trpc.procedure
    .input(updateUserInput)
    .mutation(async ({ ctx, input }) => {
        if (!ctx.user) {
            throw new Error("Вы не авторизованы");
        }

        // Проверяем текущий пароль
        const user = await ctx.prisma.user.findFirst({
            where: {
                id: ctx.user.id,
                password: getPassword(input.currentPassword),
            },
        });

        if (!user) {
            throw new Error("Неверный текущий пароль");
        }

        // Проверяем, не занято ли новое имя пользователя
        if (input.name !== user.name) {
            const existingUser = await ctx.prisma.user.findUnique({
                where: {
                    name: input.name,
                },
            });

            if (existingUser) {
                throw new Error("Пользователь с таким именем уже существует");
            }
        }

        // Обновляем данные пользователя
        const updatedUser = await ctx.prisma.user.update({
            where: {
                id: ctx.user.id,
            },
            data: {
                name: input.name,
                ...(input.newPassword && {
                    password: getPassword(input.newPassword),
                }),
            },
        });

        return {
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
            },
        };
    }); 