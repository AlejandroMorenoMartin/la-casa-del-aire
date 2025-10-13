// ================================
// 🖼️ IMAGE GALLERY
// Slider para modal-images
// Integrado con el sistema de modales y sistema de traducciones
// ================================

import { homeImages } from "./homeImages.js";
import { environmentImages } from "./environmentImages.js";

let currentIndex = 0;
let currentGallery = [];
let galleryType = "";
let translations = null;

// ================================
// 🔹 Carga traducciones según idioma del <html>
// ================================
async function loadTranslations() {
  const lang = document.documentElement.lang || "es";
  const url = `./language/${lang}.json`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    translations = await res.json();
    console.log("🌐 Traducciones cargadas:", lang);
  } catch (err) {
    console.error("❌ Error cargando archivo de idioma:", err);
  }
}

// ================================
// 🔹 Inicializa la galería
// ================================
export async function initImageGallery() {
  console.log("🚀 initImageGallery ejecutado");
  await loadTranslations();

  const modal = document.getElementById("modal-images");
  if (!modal) return console.warn("⚠️ Modal de imágenes no encontrado.");

  const viewer = modal.querySelector("#modal-image-viewer");
  const title = modal.querySelector("#modal-image-title");
  const caption = modal.querySelector("#modal-image-caption");
  const counter = modal.querySelector("#gallery-counter");
  const btnPrev = modal.querySelector("#gallery-prev");
  const btnNext = modal.querySelector("#gallery-next");

  // ===============================
  // Selecciona galería según tipo
  // ===============================
  function selectGallery(type) {
    switch (type) {
      case "home":
        galleryType = "home";
        currentGallery = homeImages;
        break;
      case "environment":
        galleryType = "environment";
        currentGallery = environmentImages;
        break;
      default:
        galleryType = "";
        currentGallery = [];
    }
  }

  // ===============================
  // 🔹 Actualiza imagen y textos con traducción
  // ===============================
  function updateView() {
    const item = currentGallery[currentIndex];
    if (!item) {
      console.warn("⚠️ No hay item válido en la galería");
      return;
    }

    // Aseguramos la carga visual
    viewer.src = item.src;
    viewer.alt = `Imagen ${currentIndex + 1}`;
    console.log("🖼️ Mostrando:", viewer.src);

    const imgKey = String(currentIndex + 1).padStart(2, "0");
    const langTitle =
      translations?.gallery?.[galleryType]?.[imgKey]?.title ||
      `Imagen ${imgKey}`;
    const langCaption =
      translations?.gallery?.[galleryType]?.[imgKey]?.caption || "";

    title.textContent = langTitle;
    caption.textContent = langCaption;
    counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
  }

  // ===============================
  // Navegación
  // ===============================
  function nextImage() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateView();
  }

  function prevImage() {
    currentIndex =
      (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateView();
  }

  // ===============================
  // 🔹 Detectar apertura del modal (siempre activo)
  // ===============================
  document.addEventListener("modal:opened", (e) => {
    if (e.detail === "modal-images") {
      const el = window.lastGalleryTrigger;
      if (!el) {
        console.warn("⚠️ modal:opened sin trigger previo.");
        return;
      }

      const gallery = el.dataset.gallery;
      const index = parseInt(el.dataset.index, 10) || 0;

      console.log("📂 Abriendo galería:", gallery, "→ índice", index);
      selectGallery(gallery);
      currentIndex = index;

      // 🔸 Pequeño retraso para asegurar que el modal ya está visible
      setTimeout(updateView, 50);
    }
  });

  // ===============================
  // Registrar disparadores tan pronto como existan en el DOM
  // ===============================
  function registerGalleryTriggers() {
    const triggers = document.querySelectorAll(
      "[data-modal-target='modal-images']"
    );
    if (!triggers.length) {
      console.warn("⚠️ Aún no hay disparadores en el DOM, reintentando...");
      setTimeout(registerGalleryTriggers, 200); // reintenta en 200 ms
      return;
    }

    console.log("🎯 Disparadores encontrados:", triggers.length);
    triggers.forEach((el) => {
      el.addEventListener("click", () => {
        window.lastGalleryTrigger = el;
        console.log(
          "📸 Trigger guardado:",
          el.dataset.gallery,
          el.dataset.index
        );
      });
    });
  }

  // Ejecutar inmediatamente (por si ya están disponibles)
  registerGalleryTriggers();

  // ===============================
  // Controles del slider
  // ===============================
  btnNext?.addEventListener("click", nextImage);
  btnPrev?.addEventListener("click", prevImage);

  // Navegación por teclado
  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("is-active")) {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    }
  });

  console.log(
    "🖼️ Galería de imágenes inicializada correctamente con traducciones"
  );
}
