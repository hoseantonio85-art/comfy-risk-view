// vite.config.ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/comfy-risk-view/' : '/',
    
    // 🔥 Главное: включаем статическую генерацию для GitHub Pages
    tanstackStart: {
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: true,
      },
    },
  };
});
