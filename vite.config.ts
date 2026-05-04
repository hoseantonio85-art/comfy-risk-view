// vite.config.ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/comfy-risk-view/' : '/',
    // Убираем tanstackStart.prerender — настройки теперь в app.config.ts
  };
});
