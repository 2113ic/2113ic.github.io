import '/src/js/initTheme.js'
import MainHead from '../components/MainHead.js';
import Article from '../components/Article.js';

const mainHead = new MainHead('mainHead');
new Article({
  fl: 'mainArticle',
  pagin: 'articlePagin',
  url: '/article.json'
});

const headAvatar = mainHead.elm.querySelector('.head-avatar');
rippleEffect(headAvatar);