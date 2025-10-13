// ================================
// LANGMENU
// Controla el cambio de idioma y el estado activo de botones de idioma
// ================================
import { changeLanguage } from "./i18n.js";
import { getLang } from "../core/state.js";

export function initLangMenu() {
  setupLangButtons();

  // 🔁 Reaplica listeners y estado cada vez que se recargan componentes
  document.addEventListener("components:loaded", setupLangButtons);

  // Escucha los cambios globales de idioma (cuando el usuario pulsa un botón)
  document.addEventListener("language:changed", (e) => {
    updateActiveLang(e.detail);
  });
}

// ================================
// Configura los botones y listeners
// ================================
function setupLangButtons() {
  const langButtons = document.querySelectorAll("[data-lang]");
  if (!langButtons.length) return;

  const currentLang = localStorage.getItem("lang") || getLang();
  updateActiveLang(currentLang);

  langButtons.forEach((btn) => {
    btn.onclick = async () => {
      const lang = btn.dataset.lang;
      await changeLanguage(lang);
    };
  });
}

// ================================
// Actualiza el idioma activo visualmente
// ================================
function updateActiveLang(lang) {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}
