// ================================
// 🧩 Component Loader
// ================================
import { refreshTranslations } from "./i18n.js";

export async function loadComponents() {
  const components = document.querySelectorAll("[data-component]");

  for (const el of components) {
    const name = el.getAttribute("data-component");
    // ✅ Ruta relativa compatible con Vite (sirviendo desde /src)
    const path = `./components/${name}.html`;

    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      el.innerHTML = html;

      // ================================
      // 🧭 Component-specific logic
      // ================================
      if (name === "navbar") handleNavbar(el);
    } catch (err) {
      console.error(`❌ Error loading component: ${name}`, err);
    }
  }

  // 🔁 Reaplicar traducciones tras cargar componentes
  refreshTranslations();

  // 🧭 Activar estados activos (página + idioma)
  setActiveStates();

  // 🪟 Activar comportamiento de modales
  handleModalEvents();
}

// ================================
// 🧭 Navbar Logic
// ================================
function handleNavbar(el) {
  const showReserve = el.dataset.showReserve === "true";
  const reserveBtn = el.querySelector(".button-primary_regular");
  if (!showReserve && reserveBtn) reserveBtn.remove();
}

// ================================
// 🪟 Universal Modal Logic
// ================================
function handleModalEvents() {
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-modal-target]");
    const closeBtn = e.target.closest("[data-modal-close]");
    const overlayClick = e.target.matches(
      "[data-modal-close], .modal-menu__overlay, .modal-profile__overlay, .modal-reserve__overlay, .modal-conditions__overlay"
    );

    // 🔹 Abrir modal
    if (openBtn) {
      const targetId = openBtn.getAttribute("data-modal-target");
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add("is-active");

        // 🧾 Si es el modal de reserva, carga el widget Amenitiz
        if (targetId === "modal-reserve") {
          loadAmenitizWidget();
        }
      }
    }

    // 🔹 Cerrar modal (botón o overlay)
    if (closeBtn || overlayClick) {
      const modal = e.target.closest(
        ".modal-menu, .modal-profile, .modal-reserve, .modal-conditions"
      );
      if (modal) {
        modal.classList.add("closing");
        setTimeout(() => {
          modal.classList.remove("is-active", "closing");
        }, 500); // Duración de la transición CSS
      }
    }
  });
}

// ================================
// 🧾 Cargar widget Amenitiz
// ================================
function loadAmenitizWidget() {
  console.log("⏳ Intentando cargar widget Amenitiz...");
  setTimeout(() => {
    const container = document.querySelector("#amenitiz-widget");
    if (!container) {
      console.warn("❌ Contenedor #amenitiz-widget no encontrado");
      return;
    }
    if (container.querySelector("iframe")) {
      console.log("⚠️ Widget ya cargado previamente");
      return;
    }

    container.innerHTML = `
      <iframe
        src="https://casa-del-aire.amenitiz.io/es/booking/room#DatesGuests-BE"
        width="100%"
        height="600"
        style="border:none; border-radius:1rem;"
        loading="lazy"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      ></iframe>
    `;

    console.log("✅ Widget Amenitiz cargado correctamente");
  }, 400);
}

// ================================
// 🌍 Active Page & Language Highlight
// ================================
function setActiveStates() {
  const file = window.location.pathname.split("/").pop() || "index.html";
  const currentPage = file.replace(".html", "") || "index";

  // 🔸 Marcar página activa en el menú modal
  document.querySelectorAll("[data-nav-target]").forEach((btn) => {
    const target = btn.getAttribute("data-nav-target");
    const slug = target.replace(".html", "");
    btn.classList.toggle("active", slug === currentPage);
  });

  // 🔸 Marcar idioma activo desde localStorage
  const savedLang = localStorage.getItem("lang");
  if (savedLang) {
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === savedLang);
    });
  }
}
