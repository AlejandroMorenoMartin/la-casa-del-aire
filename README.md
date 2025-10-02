# 🌿 La Casa del Aire - Proyecto Web

Web estática de **La Casa del Aire**, un alojamiento rural en Extremadura.  
Construida con **Vite (HTML/CSS/JS)** y desplegada en **IONOS** mediante GitHub Actions.  

---

## 🚀 Despliegue

- **Rama `dev`** → [https://dev.casadelaire.es](https://dev.casadelaire.es)  
- **Rama `main`** → [https://casadelaire.es](https://casadelaire.es) (reservada para producción)  

El build se genera con:

```bash
npm run build
```

y el contenido de `dist/` es lo que se sube al servidor.

---

## 📄 Archivos clave en `/public/`

### `site.webmanifest`
Define cómo se comporta la web cuando se añade a pantalla de inicio en móviles.  
Contiene:
- `name`, `short_name`, `description`  
- `start_url`, `display`  
- `background_color`, `theme_color`  
- `icons` → requiere:
  - `favicon-192x192.png`  
  - `favicon-512x512.png`  
  - `apple-touch-icon.png`  

### `robots.txt`
Archivo público que indica a los buscadores cómo indexar el sitio.  
Ejemplo usado:

```
User-agent: *
Allow: /

Sitemap: https://casadelaire.es/sitemap.xml
```

### `sitemap.xml`
Mapa del sitio en formato XML con las páginas principales:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://casadelaire.es/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://casadelaire.es/about.html</loc>
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

### `og-image.jpg`
Imagen de previsualización para redes sociales (1200×630 px recomendado).  

### `humans.txt`
Archivo opcional con créditos. Ejemplo:

```
/* TEAM */
Designer & Developer: Alejandro (Product Designer)
Location: Madrid, Spain
Contact: https://casadelaire.es

/* SITE */
Last update: 2025-10-02
Language: es, en, fr, pt
Standards: HTML5, CSS3, ES6
Components: Vite, Node.js scripts

/* THANKS */
Thanks to: La Casa del Aire team
```

---

✅ Con estos archivos, el proyecto está optimizado para **SEO básico**, **compatibilidad en navegadores** y **soporte para instalación en móviles**.  
