import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Personaliza tu configuración de Playwright aquí
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'retain-on-failure',
  },
});
