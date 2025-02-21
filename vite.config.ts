import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: {
      clientPort: 443
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'router-vendor': ['react-router-dom']
        }
      }
    },
    // Ensure assets are processed correctly
    assetsDir: 'assets',
    // Generate a _redirects file for client-side routing
    writePlugin: {
      name: 'write-redirects',
      writeBundle() {
        require('fs').writeFileSync('dist/_redirects', '/* /index.html 200')
      }
    }
  }
})