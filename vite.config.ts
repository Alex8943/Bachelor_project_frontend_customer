import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4001,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  resolve: {
    alias: {
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      sys: 'util',
      '@': path.resolve(__dirname, '/src'),  // Ensures '@' points to /src correctly
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],  // Ensures Vite can resolve extensions automatically
  },
  build: {
    outDir: 'dist',  // Explicitly set output directory
    sourcemap: true,  // Helpful for debugging in production
  },
});
