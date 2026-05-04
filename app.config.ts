// app.config.ts
import { defineConfig } from '@tanstack/react-start/config';

export default defineConfig({
  // 🔥 Ключевая настройка: отключаем SSR, включаем SPA
  ssr: false,
  
  // Опционально: пререндер главной страницы
  prerender: {
    enabled: true,
    routes: ['/'], // Пререндерить только главную
  },
});
