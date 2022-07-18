import '/src/js/initTheme.js'
import Article from '/src/components/Article.js';

new Article({
    fl: 'mainArticle',
    pagin: 'reslutPagin',
    data: function search() {
        const q = this.$getUrlParam("q")?.toLocaleLowerCase();
        const datas = this.$getJsonData('/article.json');

        return datas.then(data => {
            const reslut = data.filter(item => (
                item.title.toLocaleLowerCase().includes(q) ||
                item.tags.includes(q)
            ));
    
            if (reslut.length > 0) {
                this.$articleLists.hidden = false;
                this.$nullTip.hidden = true;
                return reslut;
            }
            this.$nullTip.hidden = false;
            this.$articleLists.hidden = true;
            return reslut;
        });
    }
});