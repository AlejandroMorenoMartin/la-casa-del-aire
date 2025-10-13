// ================================
// FEATURES — Google Reviews (con modo simulado)
// ================================
let googleLibsLoaded = null;

async function loadGoogleLibraries(apiKey, language = "es") {
  if (window.google?.maps?.places?.Place) return;
  if (!googleLibsLoaded) {
    googleLibsLoaded = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=${language}&v=weekly&loading=async`;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  await googleLibsLoaded;
  return new Promise((resolve) => {
    const check = () => {
      if (window.google?.maps?.places?.Place) resolve();
      else setTimeout(check, 100);
    };
    check();
  });
}

function renderStars(rating) {
  const full = "★".repeat(Math.round(rating));
  const empty = "☆".repeat(5 - Math.round(rating));
  return `<span class="rating">${full}${empty}</span>`;
}

function renderReviews(container, reviews, limit = 5) {
  if (!reviews || !reviews.length) {
    container.innerHTML = `<p>No hay reseñas disponibles por el momento.</p>`;
    return;
  }

  container.innerHTML = reviews
    .slice(0, limit)
    .map((r) => {
      const name = r.authorAttribution?.displayName ?? "Usuario";
      const photo = r.authorAttribution?.photoURI ?? "https://via.placeholder.com/48";
      const text = r.text ?? "";
      const rating = r.rating ?? 0;
      const time = r.relativePublishTimeDescription ?? "";
      return `
        <article class="review">
          <header class="review-header">
            <img src="${photo}" alt="Foto de ${name}" class="review-photo" width="48" height="48" />
            <div class="review-meta">
              <strong>${name}</strong>
              ${renderStars(rating)}
              <time>${time}</time>
            </div>
          </header>
          <p class="review-text">${text}</p>
        </article>
      `;
    })
    .join("");
}

export async function initGoogleReviews({
  apiKey,
  placeId,
  containerSelector = "#google-reviews",
  language = "es",
  limit = 5,
  simulate = false, // 🔹 activa modo simulado
} = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  try {
    if (simulate) {
      const res = await fetch("/data/reviews.json");
      const reviews = await res.json();
      renderReviews(container, reviews, limit);
      return;
    }

    await loadGoogleLibraries(apiKey, language);
    const { Place } = google.maps.places;
    const place = new Place({ id: placeId });
    const details = await place.fetchFields({ fields: ["displayName", "rating", "reviews"] });
    renderReviews(container, details.reviews, limit);
  } catch (err) {
    console.error("❌ Error al cargar reseñas de Google:", err);
    container.innerHTML = `<p>No se pudieron cargar las reseñas.</p>`;
  }
}
