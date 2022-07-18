class MainHead extends Fleet {
  toggleTheme() {
    const html = document.documentElement;
    const nowTheme = html.getAttribute('data-theme');
    const args = (nowTheme === 'light') ? ['data-theme', 'dark'] : ['data-theme', 'light'];

    html.setAttribute(...args);
    localStorage.setItem(...args);
  }
}

export default MainHead;