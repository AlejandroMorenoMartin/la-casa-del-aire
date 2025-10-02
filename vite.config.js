import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './', // 👈 raíz es la carpeta del proyecto, no src
  build: {
    outDir: 'dist',       // salida en /dist
    emptyOutDir: true,    // limpia antes de build
    rollupOptions: {
      input: {
        environment: resolve(__dirname, 'src/environment.html'),
        home: resolve(__dirname, 'src/home.html'),
        index: resolve(__dirname, 'src/index.html'),
      },
    },
  },
})
