import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.scss";

import App from "./App.tsx";
import { TrpcProvider } from "./lib/trpc.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <TrpcProvider>
            <App />
        </TrpcProvider>
    </StrictMode>,
);
