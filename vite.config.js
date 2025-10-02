import { defineConfig } from 'vite'

// Configuración básica para proyectos sin React
export default defineConfig({
  root: './src', // aquí está tu código fuente
  build: {
    outDir: '../dist', // salida de la build en /dist
    emptyOutDir: true,
  },
})
