import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/comfy-risk-view/" : "/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
}));
