import MainHead from '../components/MainHead.js';
import Article from '../components/Article.js';

new MainHead('mainHead');
new Article('mainArticle').initPage();
initTheme();
function initTheme() {
  const nowTheme = localStorage.getItem('fl-theme');
  const html = document.documentElement;
  const args = ['fl-theme', nowTheme || 'light'];

  html.setAttribute(...args);
  localStorage.setItem(...args);
}