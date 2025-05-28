import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react(), tailwindcss()],
        server: {
            host: "0.0.0.0",
            port: +env.PORT,
        },
        preview: {
            port: +env.PORT,
        },
        optimizeDeps: {
            exclude: ["lucide-react"],
        },
    };
});
