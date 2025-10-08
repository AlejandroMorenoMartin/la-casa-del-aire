/* ================================
   🌍 i18n.js
   Sistema de traducciones multilenguaje (compatible con estructura plana)
================================ */

const supportedLanguages = ["en", "es", "fr", "pt"];
let currentLang = "en";
let cachedTranslations = {}; // 🧠 Cachea los JSON cargados

/**
 * Detecta el idioma preferido del usuario
 */
function detectLanguage() {
  const storedLang = localStorage.getItem("lang");
  if (storedLang && supportedLanguages.includes(storedLang)) return storedLang;

  const browserLang = navigator.language.slice(0, 2);
  return supportedLanguages.includes(browserLang) ? browserLang : "en";
}

/**
 * Carga el archivo JSON de idioma (con cacheo)
 */
async function loadLanguage(lang) {
  try {
    // Si ya está cacheado, úsalo directamente
    if (cachedTranslations[lang]) {
      applyTranslations(cachedTranslations[lang]);
      updateLanguageButtons(lang);
      currentLang = lang;
      return;
    }

    const response = await fetch(`./language/${lang}.json`);
    if (!response.ok)
      throw new Error(`No se pudo cargar el archivo de idioma: ${lang}`);

    const translations = await response.json();
    cachedTranslations[lang] = translations; // Guarda en caché
    applyTranslations(translations);
    updateLanguageButtons(lang);

    localStorage.setItem("lang", lang);
    currentLang = lang;
  } catch (error) {
    console.error("Error cargando idioma:", error);
  }
}

/**
 * Busca un valor anidado en un objeto (por ejemplo: "components.modal-menu.pages-one")
 */
function getNestedValue(obj, keyPath) {
  return keyPath.split(".").reduce((acc, key) => acc?.[key], obj);
}

/**
 * Aplica las traducciones a todos los elementos con data-key
 */
function applyTranslations(translations) {
  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    const value = getNestedValue(translations, key);

    if (typeof value === "string") el.textContent = value;
  });
}

/**
 * Actualiza la clase .active en los botones de idioma
 */
function updateLanguageButtons(lang) {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

/**
 * 🔁 Reaplica traducciones tras cargar componentes dinámicos
 */
export function refreshTranslations() {
  // Usa la versión cacheada si existe
  if (cachedTranslations[currentLang]) {
    applyTranslations(cachedTranslations[currentLang]);
  } else {
    loadLanguage(currentLang);
  }
}

/**
 * 🚀 Inicializa el sistema de traducciones
 */
export function initI18n() {
  const initialLang = detectLanguage();
  document.documentElement.setAttribute("lang", initialLang);
  loadLanguage(initialLang);

  // Escuchar clics en los botones de idioma
  document.addEventListener("click", (e) => {
    const langBtn = e.target.closest("[data-lang]");
    if (langBtn) {
      const selectedLang = langBtn.dataset.lang;
      if (selectedLang && selectedLang !== currentLang) {
        setLanguage(selectedLang);
      }
    }
  });
}

/**
 * 🌐 Cambia manualmente el idioma (usado por main.js)
 */
export function setLanguage(lang) {
  if (!supportedLanguages.includes(lang)) {
    console.warn(`Idioma no soportado: ${lang}`);
    return;
  }

  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem("lang", lang);
  currentLang = lang;

  loadLanguage(lang); // Reaplica traducciones inmediatamente
}
