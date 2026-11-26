// Run before paint; storage may be unavailable in privacy modes.
try {
  if (localStorage.getItem('huy-theme') === 'dark') document.documentElement.dataset.theme = 'dark';
} catch { /* Light is the deliberate default. */ }
