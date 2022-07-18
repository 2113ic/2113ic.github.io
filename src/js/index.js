import '/src/js/initTheme.js'
import MainHead from '../components/MainHead.js';
import Article from '../components/Article.js';

new MainHead('mainHead');
new Article({
  fl: 'mainArticle',
  pagin: 'articlePagin',
  url: '/article.json'
});