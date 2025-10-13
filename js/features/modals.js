// ================================
// MODALS SYSTEM
// Controla la apertura y cierre de todos los modales
// ================================
import { on } from "../core/dom.js";
import { initAmenitizWidget } from "./amenitizWidget.js";

export function initModals() {
  const body = document.body;
  const modals = document.querySelectorAll(".modals");
  let scrollPosition = 0; // 👈 Guardamos la posición actual

  if (!modals.length) return;

  // =====================================================
  // FUNCIONES BASE
  // =====================================================

  // 🔹 Cerrar todos los modales
  const closeAll = () => {
    modals.forEach((modal) => closeModal(modal.id));
  };

  // 🔹 Abrir modal por ID
  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return console.warn(`⚠️ Modal "${id}" no encontrado`);

    // Cierra cualquier otro modal activo
    closeAll();

    // 👇 Guardamos posición del scroll y bloqueamos el fondo sin saltos
    scrollPosition = window.scrollY;
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    // 👇 Activamos el modal
    modal.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");

    // Enfoca el primer elemento interactivo (accesibilidad)
    const focusable = modal.querySelector(
      "button, a, input, textarea, select, [tabindex]"
    );
    focusable?.focus();

    // 🔈 Emitir evento global
    document.dispatchEvent(new CustomEvent("modal:opened", { detail: id }));
    console.log("📢 Evento modal:opened emitido →", id);


    // 🧩 Si es el modal de reserva, carga Amenitiz dinámicamente
    if (id === "modal-reserve") {
      initAmenitizWidget();
    }
  };

  // 🔹 Cerrar modal por ID
  const closeModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;

    // 👇 Quitar el foco
    if (document.activeElement && modal.contains(document.activeElement)) {
      document.activeElement.blur();
    }

    // 👇 Cerrar modal visualmente
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");

    // 👇 Recuperar la posición del scroll de forma suave y sin saltos
    const top = parseInt(body.style.top || "0") * -1;

    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";

    // 🔹 Espera un frame antes de restaurar el scroll (evita el salto visual)
    requestAnimationFrame(() => {
      window.scrollTo({ top, behavior: "instant" });
    });

    // 🔈 Emitir evento global
    document.dispatchEvent(new CustomEvent("modal:closed", { detail: id }));
  };

  // =====================================================
  // DELEGACIÓN DE EVENTOS
  // =====================================================

  // 🟢 Abrir modal (botones, imágenes, etc.)
  on(document, "click", "[data-modal-target]", (e, target) => {
    const id = target.getAttribute("data-modal-target");
    if (id) openModal(id);
  });

  // 🛑 Cerrar modal (botones o fondo con data-modal-close)
  on(document, "click", "[data-modal-close]", (e, target) => {
    const modal = target.closest(".modals");
    if (modal) closeModal(modal.id);
  });

  // 🔸 Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });

  // 🎹 Abrir con teclado (accesibilidad)
  document.addEventListener("keydown", (e) => {
    const target = e.target;
    if (!target.dataset.modalTarget) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(target.dataset.modalTarget);
    }
  });

  console.log("🪟 Sistema de modales inicializado correctamente");
}
