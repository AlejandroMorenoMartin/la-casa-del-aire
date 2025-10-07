# 🌿 La Casa del Aire — Proyecto Web  

Web estática de **La Casa del Aire**, un alojamiento rural en Extremadura.  
Construida con **Vite (HTML/CSS/JS)** y desplegada automáticamente en **IONOS** mediante **GitHub Actions**.  

---

## 🚀 Despliegue continuo  

- **Rama `dev`** → [https://dev.casadelaire.es](https://dev.casadelaire.es)  
  _(Versión de desarrollo y pruebas, vinculada al subdominio. Todas las actualizaciones se publican desde aquí.)_  

- **Rama `main`** → [https://casadelaire.es](https://casadelaire.es)  
  _(Versión estable y pública de producción. Solo se actualiza manualmente cuando el proyecto está listo para release.)_  

El build de producción se genera con:  

```bash
npm run build
```

El contenido de `/dist` es el que se despliega en el servidor remoto.

---

## 🧩 Estructura del proyecto  

```
Proyecto Casa del Aire/
│
├── assets-local/              # Recursos grandes (no se suben a GitHub)
│   ├── images/
│   └── videos/
│
└── la-casa-del-aire/
    ├── src/                   # Código fuente principal
    ├── public/                # Archivos estáticos no procesados por Vite
    ├── dist/                  # Resultado del build (no versionado)
    ├── scripts/               # Utilidades y automatizaciones (favicons, optimización)
    ├── .github/workflows/     # Despliegues automáticos (dev / main)
    ├── package.json
    ├── vite.config.js
    ├── README.md
    └── .gitignore
```

> 🔒 `assets-local/`, `dist/` y `node_modules/` están excluidos del control de versiones mediante `.gitignore`.

---

## 📄 Archivos clave en `/public/`  

### `site.webmanifest`
Define cómo se comporta la web cuando se instala en móviles.  
Incluye:
- `name`, `short_name`, `description`  
- `start_url`, `display`  
- `background_color`, `theme_color`  
- `icons`:  
  - `favicon-192x192.png`  
  - `favicon-512x512.png`  
  - `apple-touch-icon.png`  

---

### `robots.txt`
Controla la indexación por buscadores.  

```
User-agent: *
Allow: /

Sitemap: https://casadelaire.es/sitemap.xml
```

---

### `sitemap.xml`
Mapa de páginas principales del sitio.  

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://casadelaire.es/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://casadelaire.es/home.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://casadelaire.es/environment.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

### `og-image.jpg`
Imagen para previsualizaciones sociales.  
- Tamaño recomendado: **1200×630 px**  
- Peso < 500 KB  
- Formato: `.jpg` o `.webp`  

---

### `humans.txt`
Archivo de créditos y metadatos humanos del proyecto:  

```
/* TEAM */
Designer & Developer: Alejandro (Product Designer)
Location: Madrid, Spain
Contact: https://casadelaire.es

/* SITE */
Last update: 2025-10-06
Languages: es, en, fr, pt
Standards: HTML5, CSS3, ES6
Tools: Vite, Node.js, GitHub Actions

/* THANKS */
Thanks to: La Casa del Aire team
```

---

## 🧠 Notas técnicas

- **Framework:** Vite (sin React)  
- **Lenguajes:** HTML modular + CSS escalable + JS Vanilla organizado  
- **Traducciones:** JSON dinámicos (`/src/language/`) gestionados por `i18n.js`  
- **Componentes:** HTML modulares cargados mediante `componentsLoader.js`  
- **Deploy:** Automático desde ramas `dev` y `main`  

---

✅ Con esta estructura, el proyecto es:
- Ligero y de carga rápida.  
- Fácil de mantener y extender.  
- Compatible con SEO, PWA y redes sociales.  
- Ideal como plantilla base para futuros proyectos.  
