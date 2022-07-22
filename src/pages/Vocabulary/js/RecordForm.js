export default class RecordForm extends Fleet {

  constructor(f, WordList) {
    super(f);

    this.wordList = WordList;
    this.today = this.getDate();
    this.Msg = new Fleet.LightTip();
  }


  addWord(e) {
    e.preventDefault();
    const word = this.$word.value.trim();
    const exp = this.$exp.value.trim();
    const val = word.split('=').map(w => w.trim());

    if (!word) {
      this.Msg.warning('单词不能为空');
      return;
    }

    if (!exp) {
      this.Msg.warning('解释不能为空');
      return;
    }

    if (val.length === 2) {
      this.modifyWord(val, exp);
      this.deleteWord(val);
      localStorage.setItem(
        'recordData',
        JSON.stringify(this.wordList.recordData)
      );
      return;
    }

    if (this.isWordRepeat(word, exp)) {
      this.Msg.warning('单词已存在');
      return;
    }

    this.addWordHelper(word, exp);
  }


  modifyWord(word, exp) {
    const [oldVal, newVal] = word;

    if (!newVal) return;

    const [date, index] = this.getWordInfo(oldVal);

    if (!date || index === -1) {
      this.Msg.warning(`${oldVal}不存在`);
      return;
    }

    this.modifyWord(date, index, newVal, exp);
    this.wordList.recordData[date].splice(index, 1, `${newVal}@${exp}`);
  }


  modifyWordItem(date, wordIndex, newVal, exp) {
    const word = this.getWordNode(date, wordIndex);

    word.innerHTML = newVal;
    word.exp = exp;
  }


  getWordNode(date, wordIndex) {
    const wordList = this.wordList.elm;
    const wordItems = wordList.$$('.word-item');
    const titles = wordList.$$('.title-text');
    const index = [...titles].findIndex(el => el.innerHTML === date);
    const word = wordItems[index].$$('.word')[wordIndex];

    return word;
  }


  deleteWord(word) {
    const [oldVal, newVal] = word;

    if (newVal) return;

    const [date, index] = this.getWordInfo(oldVal);

    if (!date || index === -1) {
      this.Msg.warning(`${oldVal}不存在`);
      return;
    }

    this.deleteWordItem(date, index);
  }


  deleteWordItem(date, wordIndex) {
    const word = this.getWordNode(date, wordIndex);

    if (word.parentNode.children.length === 1) {
      word.closest('.word-item').remove();
      delete this.wordList.recordData[date]
      return;
    }
    word.remove();
    this.wordList.recordData[date].splice(wordIndex, 1);
  }


  addWordHelper(word, exp) {
    const today = this.today;
    const data = this.wordList.recordData;
    const lastDate = Object.keys(data).pop();

    if (lastDate === today) {
      this.addWordItem(word, exp);
      data[today].push(`${word}@${exp}`);
    }
    else {
      data[today] = [`${word}@${exp}`];
      this.wordList.initPage();
    }

    localStorage.setItem('recordData', JSON.stringify(data));
  }


  isWordRepeat(word, exp) {
    const date = this.wordList
      .elm.$('.word-item-title a')
      .innerHTML;

    return (
      this.wordList.recordData[date].includes(`${word}@${exp}`)
    );
  }


  addWordItem(word, exp) {
    const fisrtItem = this.wordList.elm.$('.word-item-content');
    const wordElm = this.$createElement('a', {
      className: 'word',
      href: '',
      innerHTML: word,
      exp: exp
    });

    fisrtItem.append(wordElm);
  }


  getWordInfo(word) {
    const recordData = this.wordList.recordData;
    const keys = Object.keys(recordData);

    for (let i = keys.length - 1; i >= 0; i--) {
      const value = recordData[keys[i]];
      const index = value.findIndex(val => val.includes(`${word}@`));

      return [keys[i], index];
    }
  }


  getDate(format) {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    return [y, m, d].join(format || '-');
  }
}