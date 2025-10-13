// ================================
// 🧩 COMPONENTS
// Loader de componentes HTML (fetch + eventos)
// Funciona en local, subdominio y dominio sin Vite
// ================================
export async function loadComponents() {
  const hosts = document.querySelectorAll("[data-component]");
  if (!hosts.length) return;

  await Promise.all(
    Array.from(hosts).map(async (host) => {
      const name = host.getAttribute("data-component");
      if (!name) return;

      // 🔗 Ruta relativa universal (misma carpeta base que los .html)
      const url = `./components/${name}.html`;

      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

        const html = await res.text();
        host.innerHTML = html;
      } catch (err) {
        console.error(`❌ Error al cargar el componente "${name}":`, err);
        host.innerHTML = `<!-- Error cargando ${name}.html -->`;
      }
    })
  );

  console.log("✅ Todos los componentes cargados correctamente");
  document.dispatchEvent(new CustomEvent("components:loaded"));
}
