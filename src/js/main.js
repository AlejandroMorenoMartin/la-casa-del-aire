// ==============================
// 🌐 i18n + Component Init
// ==============================
import { initI18n, setLanguage } from "./i18n.js";
import { loadComponents } from "./components.js";

// Helper — obtener idioma actual
function getCurrentLang() {
  const htmlLang = document.documentElement.getAttribute("lang");
  const stored = localStorage.getItem("lang");
  return (htmlLang || stored || "es").slice(0, 2);
}

// ==============================
// 🚀 Inicialización global
// ==============================
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1️⃣ Carga dinámica de componentes (navbar, modales, etc.)
    await loadComponents();

    // 2️⃣ Inicializa traducciones
    initI18n();

    // 3️⃣ Control del botón de idioma manual (si existe)
    const btn = document.getElementById("btn-lang");
    if (btn) {
      btn.addEventListener("click", () => {
        const current = getCurrentLang();
        const next = current === "es" ? "en" : "es";
        setLanguage(next);
        document.documentElement.setAttribute("lang", next);
        localStorage.setItem("lang", next);
      });
    }

    console.log("✅ Componentes e i18n inicializados correctamente.");
  } catch (error) {
    console.error("❌ Error al inicializar la app:", error);
  }
});
