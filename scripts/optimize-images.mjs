// scripts/optimize-images.mjs
import fg from 'fast-glob';
import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, join, resolve } from 'path';

const INPUT_DIR  = resolve('assets-local/images/originales');
const OUTPUT_DIR = resolve('assets-local/images/optimizadas');
const QUALITY = 82; // ajusta calidad entre 60–90

async function ensureDir(path) {
  try { await mkdir(path, { recursive: true }); } catch {}
}

async function toWebp(inputPath, outputPath) {
  const buf = await sharp(inputPath).webp({ quality: QUALITY }).toBuffer();
  await ensureDir(dirname(outputPath));
  await writeFile(outputPath, buf);
}

async function run() {
  const patterns = ['**/*.jpg', '**/*.jpeg', '**/*.png'];
  const files = await fg(patterns, { cwd: INPUT_DIR });

  if (!files.length) {
    console.log('ℹ️ No se encontraron imágenes en', INPUT_DIR);
    return;
  }

  console.log(`🔧 Convirtiendo ${files.length} imagen(es) a .webp...`);
  for (const rel of files) {
    const inAbs  = join(INPUT_DIR, rel);
    const outRel = rel.replace(/\.(jpe?g|png)$/i, '.webp');
    const outAbs = join(OUTPUT_DIR, outRel);

    try {
      await toWebp(inAbs, outAbs);
      console.log(`✅ ${rel} → ${outRel}`);
    } catch (e) {
      console.error(`❌ Error con ${rel}:`, e.message);
    }
  }

  console.log(`🎯 Salida: ${OUTPUT_DIR}`);
}

run().catch(err => {
  console.error('❌ Error general:', err);
  process.exit(1);
});
