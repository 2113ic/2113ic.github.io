(function initTheme() {
  const nowTheme = localStorage.getItem('data-theme');
  const html = document.documentElement;
  const args = ['data-theme', nowTheme || 'light'];

  html.setAttribute(...args);
  localStorage.setItem(...args);
}());