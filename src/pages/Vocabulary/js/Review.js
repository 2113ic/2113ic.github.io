export default class Review extends Fleet {
  
  $init() {
    this.initData();
    this.nextShow();
    this.Msg = new Fleet.LightTip();
  }

  initData() {
    const reivewStr = localStorage.getItem('reviewData');

    this.reviews = JSON.parse(reivewStr) || {};
    this.dates = Object.keys(this.reviews);
    const len = this.dates.length;
    this.model = 0;
    this.cursor = {
      date: this.dates[len - 1],
      dateLenght: len - 1,
      i: 0
    };
  }

  nextShow() {
    if (this.model == 0) {
      this.defaultShow();
    }
    else if (this.model == 1) {
      this.wordShow();
    }
    else {
      this.expShow();
    }
  }

  defaultShow() {
    const [word, exp] = this.cursorHeadle();
    const reviewBody = this.elm.$('.review-body');
    const model = this.getRandomInt(1,3);

    if (model === 1) {
      reviewBody.innerHTML = word;
      reviewBody.hideData = exp;
    } 
    else {
      reviewBody.innerHTML = exp;
      reviewBody.hideData = word;
    }
  }

  wordShow() {
    const [word, exp] = this.cursorHeadle();
    const reviewBody = this.elm.$('.review-body');

    reviewBody.innerHTML = word;
    reviewBody.hideData = exp;
  }

  expShow() {
    const [word, exp] = this.cursorHeadle();
    const reviewBody = this.elm.$('.review-body');

    reviewBody.innerHTML = exp;
    reviewBody.hideData = word;
  }

  /**
   * 处理游标状态
   * 
   * @returns 返回需要显示的单词项。
   */
  cursorHeadle() {
    let {date, i} = this.cursor;
    const values = this.reviews[date];

    if (i === values.length) {
      let len = --this.cursor.dateLenght;
      
      date = this.cursor.date = this.dates[len];
      i = this.cursor.i = 0;

      if (len === 0) {
        this.cursor.dateLenght = this.dates.length;
      }
    }

    return this.reviews[date][this.cursor.i++].split('@');
  }


  /**
   * 检查拼写
   */
  checkInput(e) {
    if (e.code !== "Enter") return;

    let target = e.target;
    const hideData = this.elm.$('.review-body').hideData;

    if (target.value.trim() === hideData) {
      target.value = '';
      this.nextShow();
      return;
    }

    this.Msg.error('拼写错误');
  }


  changeModel(e) {
    this.model = e.target.value;
  }

  /**
   * 获取两个数之间的随机整数，不含最大值，含最小值。
   * @param {number} min 最小值
   * @param {number} max 最大值
   * @returns 随机的整数。
   */
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  }

}