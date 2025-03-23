import { type Express } from "express";
import { Passport } from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AppContext } from "./cts";

export const applyPassportToExpress = (
    expressApp: Express,
    ctx: AppContext,
): void => {
    const passport = new Passport();

    passport.use(
        new Strategy(
            {
                secretOrKey: process.env.JWT_SECRET as string,
                jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
            },
            ({ id }, done) => {
                ctx.prisma.user
                    .findUnique({
                        where: {
                            id: Number(id),
                        },
                    })
                    .then((user) => {
                        if (!user) {
                            done(null, false);
                            return;
                        }
                        done(null, user);
                    })
                    .catch((err) => {
                        done(err, false);
                    });
            },
        ),
    );

    expressApp.use((req, res, next) => {
        if (!req.headers.authorization) {
            next();
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        passport.authenticate("jwt", { session: false }, (...args: any[]) => {
            req.user = args[1] || null;
            next();
        })(req, res, next);
    });
};
