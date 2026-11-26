// Run before paint; dark tech theme is the default.
try {
  if (localStorage.getItem('huy-portfolio-theme') === 'light') {
    document.documentElement.dataset.theme = 'light';
  }
} catch { /* Dark is the default. */ }
