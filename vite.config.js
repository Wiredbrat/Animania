import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   
  server: {
    allowedHosts: true,
  //   proxy: {
  //     '/anime': {
  //       target: 'https://localhost:4000',
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, '') // Remnove api prefix when forwarding api requests
  //     }
  //   }
  }
})
