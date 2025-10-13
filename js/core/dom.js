// ================================
// DOM
// Utilidades DOM (qs, qsa, on, delegate...)
// ================================
// DOM helpers
export const qs  = (sel, ctx = document) => ctx.querySelector(sel);
export const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

export function on(el, type, selOrHandler, handler) {
  if (typeof selOrHandler === "function") {
    el.addEventListener(type, selOrHandler);
    return;
  }
  el.addEventListener(type, (e) => {
    const target = e.target.closest(selOrHandler);
    if (target && el.contains(target)) handler(e, target);
  });
}

