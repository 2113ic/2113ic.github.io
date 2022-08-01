export default class Article extends Fleet {

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
      const loopData = this.dataHeadle(data);
      const allData = Object.entries(data);

      new Fleet.Pagination({
        el: pagin,
        limit: 7,
        total: loopData.length,
        jump: this.putArticleData.bind(this, loopData, allData),
        singlePageHide: true
      });
    });
  };

  dataHeadle(data) {
    const result = [];

    Object.entries(data).forEach(item => result.push(item[1]));
    return result.flat().sort((a, b) => a.date > b.date ? -1 : 1);
  }

  putArticleData(data, allData,info) {
    const { cur, limit } = info;
    data = data.slice((cur - 1) * limit, cur * limit);
    
    this.$articleItem.hidden = false;

    const lists = this.$cloneNode(this.$articleItem, data.length, true);
    this.$articleLists.innerHTML = "";
    this.$articleLists.append(lists);

    const time = this.elm.$$('.article-item-time span');
    const title = this.elm.$$('.article-item-title a');
    const desc = this.elm.$$('.article-item-desc');
    const tags = this.elm.$$('.article-tag');
    const publishs = this.elm.$$('.article-publish a');

    data.forEach((dataItem, i) => {
      time[i].innerHTML = dataItem.date;
      title[i].innerHTML = dataItem.title;
      desc[i].innerHTML = dataItem.desc;
      publishs[i].innerHTML = this.getPublishByDate(allData, dataItem.date);

      this.loadingTags(dataItem.tags, tags[i]);
    });
  }

  getPublishByDate(allData, date) {
    const index = allData.findIndex(item => (
      item[1].findIndex(e => e.date === date) !== -1
    ));

    return allData[index][0];
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