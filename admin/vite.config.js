import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  color: {
    'primary': "#0f766e"
  },
  plugins: [react(), tailwindcss()],
  server: { port: 5174 }
})
