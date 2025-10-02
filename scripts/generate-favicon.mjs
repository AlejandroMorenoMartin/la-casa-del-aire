// scripts/generate-favicon.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputPath = path.resolve("src/assets/icons/favicon.svg");
const outputDir = path.resolve("public");

const sizes = [16, 32, 192, 512];

async function generateFavicons() {
  if (!fs.existsSync(inputPath)) {
    console.error("❌ No se encontró favicon.svg en:", inputPath);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generar .ico (típico para navegadores antiguos)
  await sharp(inputPath)
    .resize(32, 32)
    .toFile(path.join(outputDir, "favicon.ico"));

  // Generar .pngs en distintos tamaños
  for (const size of sizes) {
    await sharp(inputPath)
      .resize(size, size)
      .toFile(path.join(outputDir, `favicon-${size}x${size}.png`));
  }

  console.log("✅ Favicons generados en:", outputDir);
}

generateFavicons();
