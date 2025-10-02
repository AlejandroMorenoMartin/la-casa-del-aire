// src/js/components.js
export async function loadComponents() {
  const elements = document.querySelectorAll("[data-component]");
  for (const el of elements) {
    const name = el.getAttribute("data-component");
    try {
      const res = await fetch(`./components/${name}.html`);
      const html = await res.text();
      el.innerHTML = html;
    } catch (err) {
      console.error(`❌ Error cargando componente: ${name}`, err);
    }
  }
}

// Llamar al cargar la página
document.addEventListener("DOMContentLoaded", loadComponents);
