// ================================
// NAV ACTIVE
// Marca como .active el enlace de la página actual
// y añade aria-current="page" para accesibilidad
// ================================
export function initNavActive() {
  // Ejecuta una vez ahora y también al reinyectar componentes
  syncActive();
  document.addEventListener("components:loaded", syncActive);
}

function syncActive() {
  const current = getCurrentFile(); // p.ej. 'home.html'
  const links = document.querySelectorAll('a[data-nav-target], nav a, .modal-menu a');

  links.forEach((a) => {
    const hrefFile = getFileName(a.getAttribute("href"));
    const isActive = hrefFile === current;
    a.classList.toggle("active", isActive);
    if (isActive) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });
}

function getCurrentFile() {
  // último segmento de la ruta, sin query ni hash
  let file = window.location.pathname.split("/").pop();
  file = stripHashQuery(file);
  return file || "index.html";
}

function getFileName(href) {
  if (!href) return "";
  const last = href.split("/").pop();
  return stripHashQuery(last);
}

function stripHashQuery(str) {
  return (str || "").split("#")[0].split("?")[0];
}
