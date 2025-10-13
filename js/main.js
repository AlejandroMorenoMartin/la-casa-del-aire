// ================================
// MAIN — Orquesta el arranque
// ================================
import { loadComponents } from "./core/components.js";
import { initI18n } from "./features/i18n.js";
import { initLangMenu } from "./features/langMenu.js";
import { initModals } from "./features/modals.js";
import { initNavActive } from "./features/navActive.js";
import { initBackToTop } from "./features/backToTop.js";
import { initGoogleReviews } from "./features/googleReviews.js";
import { initImageGallery } from "./features/imageGallery.js";
import { initShare } from "./features/share.js";

async function init() {
  await loadComponents();
  await initI18n();
  initLangMenu();
  initModals();
  initNavActive();

  // ===============================
  // BOTÓN VOLVER ARRIBA
  // ===============================
  const disposeBackToTop = initBackToTop({
    threshold: 500,
    animate: true,
  });

  // ===============================
  // GOOGLE REVIEWS
  // ===============================
  initGoogleReviews({
    apiKey: "AIzaSyDsjDwPZPaExktmXj6RWSOayAeZuadKF_s",
    placeId: "ChIJdxEDUH2XFQ0RbKJ0s7vGDZg",
    containerSelector: "#google-reviews",
    language: "es",
    simulate: true,
  });

  // ===============================
  // COMPARTIR — SHARE
  // ===============================
  initShare();

  // ===============================
  // GALERÍA DE IMÁGENES
  // ===============================
  initImageGallery();

  document.dispatchEvent(new CustomEvent("app:ready"));
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", init);
