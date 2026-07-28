/* Kisan Astra — hero telemetry mock + scroll reveals */

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* Scroll reveal */
  const revealEls = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  if (reducedMotion) return;

  /* Gently fluctuating phase voltages */
  const phases = [
    { el: document.getElementById("volt-r"), base: 233 },
    { el: document.getElementById("volt-y"), base: 231 },
    { el: document.getElementById("volt-b"), base: 234 },
  ].filter((p) => p.el);

  setInterval(() => {
    phases.forEach((p) => {
      p.el.textContent = String(p.base + Math.round(Math.random() * 6 - 3));
    });
  }, 2500);

  /* Ticking "today's running time" counter */
  const timeEl = document.getElementById("run-time");
  if (timeEl) {
    let seconds = 2 * 3600 + 41 * 60 + 5;
    const pad = (n) => String(n).padStart(2, "0");
    setInterval(() => {
      seconds += 1;
      timeEl.textContent = `${pad(Math.floor(seconds / 3600))}:${pad(
        Math.floor((seconds % 3600) / 60)
      )}:${pad(seconds % 60)}`;
    }, 1000);
  }
});
