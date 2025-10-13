// ================================
// I18N
// Traducciones data-key (es/en/fr/pt)
// ================================
import { getLang, setLang } from "../core/state.js";

let translations = {};

export async function initI18n() {
  const lang = localStorage.getItem("lang") || getLang();
  await loadTranslations(lang);
  applyTranslations();
}

async function loadTranslations(lang) {
  try {
    const res = await fetch(`./language/${lang}.json`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    translations = await res.json();
  } catch (err) {
    console.error("❌ Error cargando archivo de idioma:", err);
  }
}

export function applyTranslations() {
  const elements = document.querySelectorAll("[data-key]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-key");
    const text = key.split(".").reduce((obj, k) => obj?.[k], translations);
    if (text) el.innerHTML = text;
  });
}

export async function changeLanguage(lang) {
  setLang(lang);
  await loadTranslations(lang);
  applyTranslations();
  document.dispatchEvent(new CustomEvent("language:changed", { detail: lang }));
}
