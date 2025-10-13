// check-paths.js
import fs from "fs";
import path from "path";

const projectRoot = path.resolve("src");
const exts = [".html", ".js", ".css"];
const regex = /(["'(])\.\/assets\/[a-zA-Z0-9_\-/\.]+\.(webp|jpg|jpeg|png|mp4|webm|ico|svg|txt|xml|json)\1/g;

const filesChecked = [];
const missing = [];

function scanDir(dir) {
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      scanDir(filePath);
    } else if (exts.includes(path.extname(file))) {
      checkFile(filePath);
    }
  }
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const matches = content.match(regex) || [];
  matches.forEach((m) => {
    const cleanPath = m.replace(/['"]/g, "");
    const assetPath = path.resolve(projectRoot, cleanPath.replace("./", "../public/"));
    if (!fs.existsSync(assetPath)) {
      missing.push({ file: filePath, ref: cleanPath });
    }
  });
  filesChecked.push(filePath);
}

console.log("🔍 Comprobando rutas en el proyecto...");
scanDir(projectRoot);

console.log(`\n📄 Archivos revisados: ${filesChecked.length}`);
console.log(`🔢 Total de rutas comprobadas: ${missing.length === 0 ? "✔️ Todas correctas" : missing.length}`);

if (missing.length > 0) {
  console.log("\n❌ Archivos o rutas faltantes:");
  missing.forEach((m) => {
    console.log(`  - ${m.file}: ${m.ref}`);
  });
} else {
  console.log("\n✅ Todas las rutas de assets son válidas");
}
