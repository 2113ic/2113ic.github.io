import Article from '../../components/Article.js';

const article = new Article('mainArticle');
initTheme();
search();

function initTheme() {
  const nowTheme = localStorage.getItem('fl-theme');
  const html = document.documentElement;
  const args = ['fl-theme', nowTheme || 'light'];

  html.setAttribute(...args);
  localStorage.setItem(...args);
}

function search() {
    const q = article.$getUrlParam("q")?.toLocaleLowerCase();
    
    article.articleData.then(data => {
        const reslut = data.filter(item => item.title.toLocaleLowerCase().includes(q));

        if (reslut.length > 0) {
            new Fleet.Pagination({
                el: "reslutPagin",
                limit: 7,
                total: reslut.length,
                jump: article.putArticleData.bind(article, reslut)
            });

            article.$articleLists.hidden = false;
            article.$nullTip.hidden = true;
        } else {
            article.$nullTip.hidden = false;
            article.$articleLists.hidden = true;
        }
    });
}