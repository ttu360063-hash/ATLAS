import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Garante que o build funcione no Vercel (SPA em subpasta/paths relativos)
  base: './',
})

