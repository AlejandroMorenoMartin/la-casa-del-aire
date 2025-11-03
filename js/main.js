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
import { initCarousel } from "./features/carousel.js"; 

async function init() {
  // ===============================
  // CARGA DE COMPONENTES E IDIOMA
  // ===============================
  await loadComponents();
  await initI18n();
  initLangMenu();

  // ===============================
  // MODALES Y NAVEGACIÓN ACTIVA
  // ===============================
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
  // COMPARTIR — SHARE
  // ===============================
  initShare();

  // ===============================
  // GALERÍA DE IMÁGENES
  // ===============================
  initImageGallery();

  // ===============================
  // CARRUSEL DE IMÁGENES (solo móvil)
  // ===============================
  initCarousel();

  // ===============================
  // EVENTO FINAL — APLICACIÓN LISTA
  // ===============================
  document.dispatchEvent(new CustomEvent("app:ready"));
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", init);
