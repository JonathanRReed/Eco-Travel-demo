// Nomadiq Travel Destinations – script.js
// - Mobile nav toggle
// - Current year in footer
// - Basic smooth scroll (respects reduced motion)

(function () {
  const nav = document.querySelector('.primary-nav');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  if (toggle && nav && menu) {
    toggle.addEventListener('click', () => {
      const expanded = nav.getAttribute('aria-expanded') === 'true';
      nav.setAttribute('aria-expanded', String(!expanded));
      toggle.setAttribute('aria-expanded', String(!expanded));
    });

    // Close menu when a link is clicked (mobile)
    menu.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.tagName === 'A') {
        nav.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Smooth scroll (reduced motion aware)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const id = href && href.slice(1);
        const target = id && document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', href);
        }
      });
    });
  }

  // Theme handling
  const mediaDark = window.matchMedia('(prefers-color-scheme: dark)');
  const getStoredTheme = () => localStorage.getItem('theme');
  const setStoredTheme = (t) => localStorage.setItem('theme', t);
  const currentStored = getStoredTheme();

  const applyTheme = (t, manual = false) => {
    root.setAttribute('data-theme', t);
    if (themeToggle) {
      const isDark = t === 'dark';
      themeToggle.setAttribute('aria-pressed', String(isDark));
      const icon = themeToggle.querySelector('.theme-icon');
      if (icon) icon.textContent = isDark ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (manual) setStoredTheme(t);
  };

  const initTheme = () => {
    if (currentStored === 'dark' || currentStored === 'light') {
      applyTheme(currentStored);
    } else {
      applyTheme(mediaDark.matches ? 'dark' : 'light');
    }
  };

  initTheme();

  // React to user toggling
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
    });
  }

  // React to system changes if user hasn't chosen manually
  mediaDark.addEventListener('change', (e) => {
    if (!getStoredTheme()) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
