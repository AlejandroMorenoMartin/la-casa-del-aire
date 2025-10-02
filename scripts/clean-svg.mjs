import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import { optimize } from 'svgo';

const iconsPath = path.resolve('src/assets/icons');

async function cleanSVGs() {
  console.log(`🔍 Buscando iconos en: ${iconsPath}`);

  // Buscar en carpeta y subcarpetas, compatible con Windows
  const files = await fg(`${iconsPath}/**/*.svg`.replace(/\\/g, '/'));

  if (files.length === 0) {
    console.log('⚠️ No se encontraron SVGs en la carpeta.');
    return;
  }

  for (const file of files) {
    try {
      const data = await fs.readFile(file, 'utf8');
      const result = optimize(data, {
        multipass: true,
        plugins: [
          'removeDimensions',     // elimina width/height
          'removeStyleElement',   // elimina estilos inline
          'removeScriptElement',  // elimina scripts
          {
            name: 'removeAttrs',  // elimina fill, stroke, style inline
            params: { attrs: '(fill|stroke|style)' }
          }
        ],
      });

      await fs.writeFile(file, result.data, 'utf8');
      console.log(`✅ Limpio: ${path.basename(file)}`);
    } catch (err) {
      console.error(`❌ Error limpiando ${file}:`, err.message);
    }
  }
}

cleanSVGs();
