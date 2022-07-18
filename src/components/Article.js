class Article extends Fleet {

  constructor({fl, pagin, url, data}) {
    super(fl);

    this.init(pagin, url, data);
  }

  init(pagin, url, data) {

    if (url) {
      this.articleData = this.$getJsonData(url);
    }

    if (data) {
      this.articleData = data.call(this);
    }

    this.initPage(pagin);
  }

  initPage(pagin) {
    this.articleData.then(data => {
      new Fleet.Pagination({
        el: pagin,
        limit: 7,
        total: data.length,
        jump: this.putArticleData.bind(this, data),
        singlePageHide: true
      });
    });
  };

  putArticleData(data, info) {
    const { cur, limit } = info;
    data = data.slice((cur - 1) * limit, cur * limit);

    const lists = this.$cloneNode(this.$articleItem, data.length, true);
    this.$articleLists.innerHTML = "";
    this.$articleLists.append(lists);

    const time = this.elm.$$('.article-item-time span');
    const title = this.elm.$$('.article-item-title a');
    const content = this.elm.$$('.article-item-show');
    const tags = this.elm.$$('.article-tag');

    data.forEach((dataItem, i) => {
      time[i].innerHTML = dataItem.time;
      title[i].innerHTML = dataItem.title;
      content[i].innerHTML = dataItem.content;

      this.loadingTags(dataItem.tags, tags[i]);
    });
  }

  loadingTags(dataTags, tag) {
    const tags = this.$cloneNode(tag, dataTags.length, true);

    [...tags.children].forEach((item, i) => {
      item.innerHTML = dataTags[i];
    });
    tag.parentNode.append(tags);
    tag.parentNode.removeChild(tag);
  }
}
export default Article;