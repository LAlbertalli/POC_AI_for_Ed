import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative assets loading for static deployment on GitHub Pages
  server: {
    port: 3000,
    open: false,
  },
});
