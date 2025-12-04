import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // USO DE RUTA RELATIVA: Crucial para Vercel y subcarpetas
  define: {
    // Esto evita que el código que usa process.env.API_KEY rompa la app en el navegador
    'process.env': {}
  }
})