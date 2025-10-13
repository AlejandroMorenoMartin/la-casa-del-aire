// ================================
// STATE
// Estado global ligero (lang actual, etc.)
// ================================
// src/js/core/state.js
export const state = {
  lang: document.documentElement.lang || "es",
};

export function setLang(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
}

export function getLang() {
  return state.lang || localStorage.getItem("lang") || "es";
}
