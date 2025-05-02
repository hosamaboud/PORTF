import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// vite.config.js
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotli',
      ext: '.br',
      threshold: 1024,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap', '@studio-freight/lenis'],
          icons: ['react-icons'],
        },
      },
    },
  },
});
