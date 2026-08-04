import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite config for the React frontend.
 * Proxy is optional for local dev if you prefer relative /api calls;
 * we use VITE_API_URL directly via Axios for explicit deploy parity.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
