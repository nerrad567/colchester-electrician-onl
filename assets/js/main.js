(function () {
  const root = document.documentElement;

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  // Smooth scroll for internal links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (evt) => {
      const href = link.getAttribute("href");
      if (!href || href === "#" || href.charAt(0) !== "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      evt.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Theme toggle
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeLabel = themeToggleBtn
    ? themeToggleBtn.querySelector(".theme-toggle-label")
    : null;
  const themeIcon = themeToggleBtn
    ? themeToggleBtn.querySelector(".theme-toggle-icon")
    : null;

  function applyTheme(theme) {
    const normalized = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", normalized);
    // namespace localStorage key so it doesn't clash with other sites
    localStorage.setItem("colchester-theme", normalized);

    if (themeLabel && themeIcon) {
      if (normalized === "light") {
        themeLabel.textContent = "Light mode";
        themeIcon.textContent = "☀️";
      } else {
        themeLabel.textContent = "Dark mode";
        themeIcon.textContent = "🌙";
      }
    }
  }

  (function initTheme() {
    const stored = localStorage.getItem("colchester-theme");
    const currentAttr = root.getAttribute("data-theme");

    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
    } else if (currentAttr === "light" || currentAttr === "dark") {
      applyTheme(currentAttr);
    } else {
      applyTheme("dark");
    }
  })();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current =
        root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      applyTheme(next);
    });
  }
})();
