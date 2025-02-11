import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3002' /* note to change in production */,
        changeOrigin: true,
        secure: false /* to adjust in production for https:// to true */,
        /* rewrite: (path) => path.replace(/^\/api/, ''), */
      },
      '/auth': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false /* to adjust in production for https:// to true */,
        /* rewrite: (path) => path.replace(/^\/auth/, ''), */
      },
      '/db-test': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false /* to adjust in production for https:// to true */,
        /* rewrite: (path) => path.replace(/^\/auth/, ''), */
      },
    },
  },
  plugins: [react()],
});
