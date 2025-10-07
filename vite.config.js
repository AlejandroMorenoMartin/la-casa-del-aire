import { defineConfig } from 'vite';
import path from 'path';
import serveStatic from 'serve-static';
import fullReload from 'vite-plugin-full-reload';

export default defineConfig({
  root: path.resolve(__dirname, 'src'),

  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.html'),
        home: path.resolve(__dirname, 'src/home.html'),
        environment: path.resolve(__dirname, 'src/environment.html'),
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@media': path.resolve(__dirname, '../www/media'),
    },
  },

  publicDir: path.resolve(__dirname, 'public'),

  server: {
    open: true,
    host: true,
    hmr: { overlay: true },
    fs: {
      allow: [
        './',
        '../www' // 👈 Permitimos leer /www
      ],
    },
  },

  plugins: [
    // 🔁 Recarga completa cuando cambian componentes HTML
    fullReload(['src/components/**/*.html', 'src/partials/**/*.html']),

    // 🌐 Servir /www/media como ruta pública /media
    {
      name: 'serve-external-media',
      configureServer(server) {
        const abs = path.resolve(__dirname, '../www/media');
        server.middlewares.use('/media', serveStatic(abs));
      },
    },
  ],
});
