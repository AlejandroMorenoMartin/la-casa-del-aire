// ================================
// AMENITIZ
// Incrustar widget de reservas
// ================================
export function initAmenitizWidget() {
  const widgetContainer = document.getElementById("amenitiz-widget");
  if (!widgetContainer) return;

  // Evita duplicar el iframe si ya existe
  if (widgetContainer.querySelector("iframe")) return;

  // Muestra un loader temporal mientras carga
  widgetContainer.innerHTML = `
    <div class="amenitiz-loader">
      <p>Cargando motor de reservas...</p>
    </div>
  `;

  const iframe = document.createElement("iframe");
  iframe.src = "https://casa-del-aire.amenitiz.io/booking/room#DatesGuests-BE"; // ✅ URL pública correcta
  iframe.loading = "lazy";
  iframe.width = "100%";
  iframe.height = "700"; // puedes ajustar según el contenido
  iframe.style.border = "none";
  iframe.setAttribute("title", "Reserva tu estancia - Casa del Aire");

  // Cuando cargue, oculta el loader
  iframe.addEventListener("load", () => {
    const loader = widgetContainer.querySelector(".amenitiz-loader");
    if (loader) loader.remove();
  });

  widgetContainer.appendChild(iframe);
}
