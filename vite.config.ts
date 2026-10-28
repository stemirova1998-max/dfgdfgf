import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Репозиторий публикуется на GitHub Pages: https://stemirova1998-max.github.io/dfgdfgf/
  base: '/dfgdfgf/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
})
