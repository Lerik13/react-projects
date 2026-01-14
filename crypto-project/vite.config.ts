import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api.coingecko.com': {
        target: 'https://api.coingecko.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
