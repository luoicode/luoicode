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
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
matchMedia('(min-width: 821px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    document.querySelectorAll('.project[data-category]').forEach(project => {
      const show = button.dataset.filter === 'all' || project.dataset.category === button.dataset.filter;
      project.hidden = !show;
      if (show) count++;
    });
    const status = document.querySelector('.work-count');
    if (status) status.textContent = String(count).padStart(2, '0') + ' ' + status.dataset.suffix;
  });
});

const themeButton = document.querySelector('.theme-toggle');
function updateThemeButton() {
  const light = document.documentElement.dataset.theme === 'light';
  themeButton?.setAttribute('aria-pressed', String(light));
  if (themeButton) {
    themeButton.setAttribute('aria-label', light ? themeButton.dataset.dark : themeButton.dataset.light);
    themeButton.title = light ? themeButton.dataset.dark : themeButton.dataset.light;
  }
}
updateThemeButton();
themeButton?.addEventListener('click', () => {
  const toLight = document.documentElement.dataset.theme !== 'light';
  if (toLight) {
    document.documentElement.dataset.theme = 'light';
  } else {
    delete document.documentElement.dataset.theme;
  }
  try {
    localStorage.setItem('huy-portfolio-theme', toLight ? 'light' : 'dark');
  } catch { /* Storage is optional. */ }
  updateThemeButton();
});

if (matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (event.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (event.clientY - rect.top) + 'px');
    });
  });
}

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
