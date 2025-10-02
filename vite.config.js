import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        home: resolve(__dirname, 'src/home.html'),
        environment: resolve(__dirname, 'src/environment.html'),
      },
    },
  },
})
