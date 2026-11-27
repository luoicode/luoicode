document.documentElement.classList.add('js');

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() {
  menu?.setAttribute('aria-expanded', 'false');
  if (menu) menu.setAttribute('aria-label', menu.dataset.open || 'Menu');
  nav?.classList.remove('is-open');
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? menu.dataset.close : menu.dataset.open);
  nav?.classList.toggle('is-open', open);
});
nav?.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
matchMedia('(min-width: 821px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

// Multi-category project filtering
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    const wanted = button.dataset.filter;
    let count = 0;
    document.querySelectorAll('.project[data-filters]').forEach(project => {
      const cats = (project.dataset.filters || '').split(',');
      const show = wanted === 'all' || cats.includes(wanted);
      project.hidden = !show;
      if (show) count++;
    });
    const status = document.querySelector('.work-count');
    if (status) status.textContent = String(count).padStart(2, '0') + ' ' + status.dataset.suffix;
  });
});

// Subtle 3D tilt on project cards
if (matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('pointermove', event => {
      const r = card.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'perspective(900px) rotateX(' + (-y * 4).toFixed(2) + 'deg) rotateY(' + (x * 4).toFixed(2) + 'deg) translateY(-4px)';
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

// Subtle scroll reveal
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}

// Active navigation highlight on scroll
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.navigation a[href*="#"]')];
if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href')?.endsWith('#' + id)));
      }
    }
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(sec => navObserver.observe(sec));
}

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
let lastTrigger = null;

function closeLightbox() {
  if (!lightbox || lightbox.hidden) return;
  lightbox.hidden = true;
  document.body.style.overflow = '';
  lastTrigger?.focus();
}

document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    if (!lightbox || !lightboxImg) return;
    lastTrigger = trigger;
    lightboxImg.src = trigger.dataset.src || '';
    lightboxImg.alt = trigger.dataset.caption || '';
    if (lightboxCaption) lightboxCaption.textContent = trigger.dataset.caption || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (lightbox && !lightbox.hidden) {
      closeLightbox();
      return;
    }
    if (menu?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  }
});

// Copy email button
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async event => {
    event.preventDefault();
    event.stopPropagation();
    const value = button.dataset.copy;
    const original = button.dataset.label || button.textContent;
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = button.dataset.copied || 'Copied';
      button.classList.add('is-copied');
      setTimeout(() => {
        button.textContent = original;
        button.classList.remove('is-copied');
      }, 1800);
    } catch { /* Clipboard unavailable */ }
  });
});
