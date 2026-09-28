/**
 * Subhasish Mukherjee — Portfolio JavaScript
 * Handles: theme, nav, scroll, animations, project filters, counter
 */

'use strict';

/* ────────────────────────────────────────────────────────────
   THEME TOGGLE
──────────────────────────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function getStoredTheme() {
  return localStorage.getItem('portfolio-theme') || 'dark';
}

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
}

// Apply stored or system theme on load
(function initTheme() {
  const stored = getStoredTheme();
  if (stored) {
    setTheme(stored);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
})();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* ────────────────────────────────────────────────────────────
   NAVIGATION — STICKY + SMART HIDE
──────────────────────────────────────────────────────────── */
const nav = document.getElementById('mainNav');
let lastScrollY = window.scrollY;
let scrollTimer = null;

function handleNavScroll() {
  const y = window.scrollY;

  if (y > 80) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }

  lastScrollY = y;
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

/* ────────────────────────────────────────────────────────────
   MOBILE MENU
──────────────────────────────────────────────────────────── */
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openMobileMenu() {
  burger.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.contains('open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  // Close on link click
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

/* ────────────────────────────────────────────────────────────
   ACTIVE NAV LINK ON SCROLL
──────────────────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

/* ────────────────────────────────────────────────────────────
   SCROLL REVEAL ANIMATION
──────────────────────────────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target); // Animate once
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ────────────────────────────────────────────────────────────
   SMOOTH SCROLL
──────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const navHeight = nav ? nav.offsetHeight : 64;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ────────────────────────────────────────────────────────────
   STAT COUNTERS
──────────────────────────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  if (!target || isNaN(target)) return;

  const duration = 1600;
  const step = 16;
  const steps = duration / step;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-item__number[data-count]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) counterObserver.observe(statsBar);

/* ────────────────────────────────────────────────────────────
   PROJECT FILTERS
──────────────────────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    // Update active button
    filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');

    // Filter cards
    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category') || '';
      const matches = filter === 'all' || categories.includes(filter);

      if (matches) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = '';
          });
        });
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ────────────────────────────────────────────────────────────
   BACK TO TOP
──────────────────────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ────────────────────────────────────────────────────────────
   KEYBOARD NAVIGATION
──────────────────────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeMobileMenu();
  }
});

/* ────────────────────────────────────────────────────────────
   TIMELINE INTERACTION (click to expand on mobile)
──────────────────────────────────────────────────────────── */
document.querySelectorAll('.timeline-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.willChange = 'transform';
  });
  card.addEventListener('mouseleave', () => {
    card.style.willChange = '';
  });
});

/* ────────────────────────────────────────────────────────────
   PERFORMANCE: Passive listeners already used above.
   Animate hero on load (initial state).
──────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  // Trigger initial hero animations by adding a tiny delay
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach(el => {
    // These will be picked up by the IntersectionObserver
    // since they are already in viewport
  });

  // Force reveal of elements already in viewport
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      el.classList.add('in-view');
    }
  });
});
