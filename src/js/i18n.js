/* ================================
   📂 i18n.js
   Sistema de traducciones con JSON
================================ */

const supportedLanguages = ["en", "es", "fr", "pt"];
let currentLang = "en"; // idioma por defecto

/**
 * Detecta el idioma del navegador
 */
function detectLanguage() {
  const browserLang = navigator.language.slice(0, 2); // ej: "es-ES" → "es"
  return supportedLanguages.includes(browserLang) ? browserLang : "en";
}

/**
 * Carga un archivo JSON de idioma
 */
async function loadLanguage(lang) {
  try {
    const response = await fetch(`./language/${lang}.json`);
    if (!response.ok) {
      throw new Error(`No se pudo cargar el archivo de idioma: ${lang}`);
    }
    const translations = await response.json();
    applyTranslations(translations);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Aplica las traducciones a los elementos con data-key
 */
function applyTranslations(translations) {
  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}

/**
 * Inicializa el sistema de traducciones
 */
export function initI18n() {
  currentLang = detectLanguage();
  loadLanguage(currentLang);
}

/**
 * Permite cambiar el idioma manualmente (ej: botón de idioma)
 */
export function setLanguage(lang) {
  if (!supportedLanguages.includes(lang)) lang = "en";
  currentLang = lang;
  loadLanguage(currentLang);
}
