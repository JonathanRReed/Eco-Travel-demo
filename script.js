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
  const themeUseEl = document.getElementById('theme-icon-use');

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

    // Close menu on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.getAttribute('aria-expanded') === 'true') {
        nav.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
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
      if (themeUseEl) themeUseEl.setAttribute('href', isDark ? '#icon-sun' : '#icon-moon');
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

  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[data-section]');
  const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
  const linkMap = new Map();
  navLinks.forEach((a) => {
    const id = a.getAttribute('href').slice(1);
    linkMap.set(id, a);
  });
  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const link = linkMap.get(id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0.1 });
    sections.forEach((sec) => io.observe(sec));
  }

  // Simple form validation
  const form = document.querySelector('.contact-form');
  if (form) {
    const status = form.querySelector('#form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');
      let errors = [];
      const emailRe = /[^@\s]+@[^@\s]+\.[^@\s]+/;
      // Reset
      [name, email, message].forEach((el) => el.setAttribute('aria-invalid', 'false'));

      if (!name.value.trim()) { errors.push('Name is required.'); name.setAttribute('aria-invalid', 'true'); }
      if (!email.value.trim() || !emailRe.test(email.value)) { errors.push('Enter a valid email.'); email.setAttribute('aria-invalid', 'true'); }
      if (!message.value.trim()) { errors.push('Please add a brief message.'); message.setAttribute('aria-invalid', 'true'); }

      if (errors.length) {
        if (status) { status.classList.remove('success'); status.textContent = errors.join(' '); }
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Simulate submit success
      if (status) { status.classList.add('success'); status.textContent = 'Thanks! We\'ll be in touch shortly.'; }
      form.reset();
    });
  }

  // Back-to-top button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (y > 500) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    backToTop.addEventListener('click', (e) => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
})();
