import express from "express";
import dotenv from "dotenv";
import * as trpcExpress from "@trpc/server/adapters/express";
import { trpcRouter } from "./trpc";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Express + TypeScript backend!");
});

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: trpcRouter,
    }),
);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
