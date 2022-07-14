class MainHead extends Fleet {
  toggleTheme() {
    const html = document.documentElement;
    const nowTheme = html.getAttribute('fl-theme');
    const args = (nowTheme === 'light') ? ['fl-theme', 'dark'] : ['fl-theme', 'light'];

    html.setAttribute(...args);
    localStorage.setItem(...args);
  }
}

export default MainHead;