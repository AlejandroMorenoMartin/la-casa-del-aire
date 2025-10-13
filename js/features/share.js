// ================================
// Share
// Botón para compartir la página
// ================================
export function initShare() {
  document.addEventListener("click", (e) => {
    const target = e.target.closest("#copy-link");
    if (!target) return;

    e.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(() => {
      const label = target.querySelector("span");
      if (label) {
        const oldText = label.textContent;
        label.textContent = "¡Link copiado!";
        setTimeout(() => (label.textContent = oldText), 2000);
      }
    });
  });

  console.log("🔗 Sistema de compartir inicializado");
}
