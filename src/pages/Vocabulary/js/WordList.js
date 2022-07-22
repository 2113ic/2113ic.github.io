export default class WordList extends Fleet {

  $init() {
    this.listItem = this.elm.$('.word-item');
    this.initStorageData();
    this.initPage();
    this.Msg = new Fleet.LightTip();
  }


  initStorageData() {
    const nowRecordData = localStorage.getItem('recordData');
    const nowReviewData = localStorage.getItem('reviewData');

    this.recordData = JSON.parse(nowRecordData) || {};
    this.reviewData = JSON.parse(nowReviewData) || {};

    if (!nowRecordData) {
      localStorage.setItem('recordData', "{}");
    }

    if (!nowReviewData) {
      localStorage.setItem('reviewData', "{}");
    }
  }


  initPage() {
    this.pagin = new Fleet.Pagination({
      el: 'WordListPagin',
      limit: 7,
      total: Object.keys(this.recordData).length,
      jump: this.fillData.bind(this, this.recordData),
      singlePageHide: true
    });
  }


  fillData(datas, info) {
    const { cur, limit } = info;
    const data = Object.entries(datas)
      .slice(-cur * limit, (cur === 1) ? undefined : (-cur + 1) * limit)
      .reverse();
    const lists = this.$cloneNode(this.listItem, data.length, true);

    this.elm.innerHTML = '';
    this.elm.append(lists);
    this.elm.style.display = 'block';

    const titles = this.elm.$$('.word-item-title a');
    const contents = this.elm.$$('.word-item-content');
    const dots = this.elm.$$('.word-item-dot');

    data.forEach((dataItem, i) => {
      const [key, val] = dataItem;
    
      titles[i].innerHTML = key;  
      this.fillWord(val, contents[i]);
      this.fillDot(key, dots[i]);
    });
  }


  fillWord(data, content) {
    const word = content.$('.word');
    const wordNode = this.$cloneNode(word, data.length, true);

    [...wordNode.children].forEach((item, i) => {
      const [word, exp] = data[i].split('@');

      item.innerHTML = word;
      item.exp = exp;
    });

    word.parentNode.append(wordNode);
    word.parentNode.removeChild(word);
  }


  fillDot(data, dot) {
    if (this.reviewData.hasOwnProperty(data)) {
      dot.classList.add('active');
    }
  }


  addWorldToReviewList(e) {
    e.preventDefault();
    this.initStorageData();
    const target = e.target;
    const date = target.innerHTML;
    const curDot = target.closest('.word-item').$('.word-item-dot');

    if (this.isNotRepeat(date)) {
      curDot.classList.add('active');
      this.reviewData[date] = this.recordData[date];
    }
    else {
      curDot.classList.remove('active');
      delete this.reviewData[date];
    }

    localStorage.setItem('reviewData', JSON.stringify(this.reviewData));
  }


  isNotRepeat(date) {
    return !this.reviewData.hasOwnProperty(date);
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