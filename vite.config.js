import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
