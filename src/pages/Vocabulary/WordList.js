class WordList extends Fleet {

  $init() {
    this.listItem = this.elm.$('.word-item');
    this.initStorageData();
    this.initPage();
    this.Msg = new Fleet.LightTip();
  }

  initStorageData() {
    const nowData = localStorage.getItem('wordData');
    this.wordData = JSON.parse(nowData) || [];

    if (!nowData) {
      localStorage.setItem('wordData', "[]")
    }
  }

  initPage(data) {
    this.pagin = new Fleet.Pagination({
      el: 'WordListPagin',
      limit: 7,
      total: data?.length || this.wordData.length,
      jump: this.fillData.bind(this, this.wordData),
      singlePageHide: true
    });
  }

  fillData(datas, info) {
    const { cur, limit } = info;
    const data = datas
      .slice(-cur * limit, (cur === 1) ? undefined : (-cur + 1) * limit)
      .reverse();
    const lists = this.$cloneNode(this.listItem, data.length, true);

    this.elm.innerHTML = '';
    this.elm.append(lists);
    this.elm.style.display = 'block';

    const titles = this.elm.$$('.word-item-title a');
    const contents = this.elm.$$('.word-item-content');

    data.forEach((dataItem, i) => {
      titles[i].innerHTML = dataItem.d;
      
      this.fillWord(dataItem.ws, contents[i]);
    });
  }

  fillWord(data, content) {
    const word = content.$('.word');
    const words = this.$cloneNode(word, data.length, true);

    [...words.children].forEach((item, i) => {
      item.innerHTML = data[i].w;
      item.exp = data[i].e;
    });
    word.parentNode.append(words);
    word.parentNode.removeChild(word);
  }

  addWorldToReviewList(e) {
    this.initStorageData();
    const target = e.target;
    const words = this.getWordDataItemByTitle(target.innerHTML);
    const nowReviewData = (
      JSON.parse(localStorage.getItem('reviews')) || []
    );

    if (words && this.isNotRepeat(words)) {
      nowReviewData.push(words);
      localStorage.setItem('reviews', JSON.stringify(nowReviewData));
    }
  }

  isNotRepeat(words) {
    const now = localStorage.getItem('reviews') || "[]";
    return !now.includes(words.d);
  }

  getWordDataItemByTitle(title) {
    const {limit, cur} = this.pagin.info;
    const temp = limit * cur;

    for (let i = temp - limit; i < temp; i++) {
      if (title === this.wordData[i].d) {
        return this.wordData[i];
      }
    }
  }

  showWordExp(e) {
    e.preventDefault();
    const target = e.target;

    if (target.className === 'word-item-content') {
      this.Msg.info(target.children.length + '词');
      return;
    }
    this.Msg.info(target.exp);
  }
}
export default WordList;