// vite.config.ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/comfy-risk-view/' : '/',
    // Любые другие кастомные настройки можно добавлять сюда
  };
});
