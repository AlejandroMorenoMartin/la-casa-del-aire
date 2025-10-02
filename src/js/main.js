import { initI18n, setLanguage } from "./i18n.js";

document.addEventListener("DOMContentLoaded", () => {
  initI18n();

  // Ejemplo: cambiar idioma al pulsar botón
  document.getElementById("btn-lang").addEventListener("click", () => {
    const newLang = currentLang === "es" ? "en" : "es"; // alterna entre es/en
    setLanguage(newLang);
  });
});
