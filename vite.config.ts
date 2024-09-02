import path from "node:path";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/ai-example/",
    plugins: [viteCompression(), react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
