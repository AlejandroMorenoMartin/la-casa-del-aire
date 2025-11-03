// ===============================
// CAROUSEL — auto-scroll en móvil
// ===============================
export function initCarousel() {
  const carousel = document.querySelector(".main-content__section-carousel");
  if (!carousel) return;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (!isMobile) return;

  let scrollAmount = 0;
  const step = carousel.clientWidth / 2; // desplaza 2 imágenes por paso
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;

  function autoScroll() {
    scrollAmount += step;
    if (scrollAmount >= maxScroll) {
      scrollAmount = 0;
    }
    carousel.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  // cada 3 segundos
  const interval = setInterval(autoScroll, 3000);

  // detener si el usuario interactúa manualmente
  const stopAutoScroll = () => clearInterval(interval);
  carousel.addEventListener("touchstart", stopAutoScroll);
  carousel.addEventListener("mousedown", stopAutoScroll);
}
