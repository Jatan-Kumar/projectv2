import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin to write _redirects file after build
function writeRedirects() {
  return {
    name: 'write-redirects',
    closeBundle() {
      const redirectsContent = '/* /index.html 200'
      const redirectsPath = path.resolve(__dirname, 'dist/_redirects')
      fs.writeFileSync(redirectsPath, redirectsContent)
      console.log('Redirects file written to', redirectsPath)
    }
  }
}

export default defineConfig({
  plugins: [react(), writeRedirects()],
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
    assetsDir: 'assets'
  }
})
