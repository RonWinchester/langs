import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { AppContext, createAppContext } from "./lib/cts";
import { applyPassportToExpress } from "./lib/passport";
import { applyTrpcToApp } from "./lib/trpc";
import { trpcRouter } from "./router";

dotenv.config();
let ctx: AppContext | null = null;
(async () => {
    try {
        const ctx = createAppContext();
        const app = express();
        app.use(cors());
        const port = process.env.PORT || 5000;
        app.use(express.json());
        applyPassportToExpress(app, ctx);
        applyTrpcToApp(app, ctx, trpcRouter);

        app.get("/", (req, res) => {
            res.send("Hello from Express + TypeScript backend!");
        });

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (e) {
        console.error(e);
        if (ctx !== null) await (ctx as AppContext).stop();
    }
})();
