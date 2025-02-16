import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { trpcRouter } from "./trpc";

dotenv.config();

const app = express();

app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: trpcRouter,
    }),
);

app.get("/", (req, res) => {
    res.send("Hello from Express + TypeScript backend!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
