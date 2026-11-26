// Run before paint; crisp white is the default.
try {
  if (localStorage.getItem('huy-theme-v3') === 'dark') {
    document.documentElement.dataset.theme = 'dark';
  }
} catch { /* Light is the default. */ }
