(function () {
  const root = document.documentElement;
  let theme = 'light';
  let direction = 'ltr';
  try {
    const urlTheme = new URLSearchParams(window.location.search).get('theme');
    const savedTheme = (urlTheme === 'dark' || urlTheme === 'light') ? urlTheme : localStorage.getItem('arenne-theme');
    const savedDirection = localStorage.getItem('arenne-dir');
    theme = savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    direction = savedDirection === 'rtl' ? 'rtl' : 'ltr';
  } catch (_) {
    theme = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  root.dataset.theme = theme;
  root.dir = direction;
  root.lang = 'en';
})();
