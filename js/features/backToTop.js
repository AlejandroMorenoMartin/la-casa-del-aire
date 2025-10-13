// ================================
// BackToTop
// Botón "volver arriba" (versión robusta para carga dinámica)
// ================================
export function initBackToTop({
  selector = '[data-behavior="back-to-top"]',
  threshold = 200,
  animate = true,
} = {}) {
  let btn = document.querySelector(selector);

  if (!btn) {
    const observer = new MutationObserver(() => {
      btn = document.querySelector(selector);
      if (btn) {
        observer.disconnect();
        setupBackToTop(btn, threshold, animate);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }

  return setupBackToTop(btn, threshold, animate);
}

function setupBackToTop(btn, threshold, animate) {
  if (btn._backToTopController) return btn._backToTopController.dispose;

  const ctrl = new AbortController();
  const { signal } = ctrl;
  btn._backToTopController = { ctrl, dispose };
  const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Estado inicial
  btn.setAttribute("data-state", "hidden");
  btn.removeAttribute("hidden");

  let ticking = false;

  const updateVisibility = () => {
    const shouldShow = window.scrollY > Number(btn.dataset.threshold ?? threshold);

    btn.setAttribute("data-state", shouldShow ? "visible" : "hidden");
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateVisibility);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true, signal });
  updateVisibility();

  btn.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      if (prefersReduced) window.scrollTo(0, 0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    },
    { signal }
  );

  function dispose() {
    ctrl.abort();
    delete btn._backToTopController;
  }

  return dispose;
}
