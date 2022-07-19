import '/src/js/initTheme.js';
import WordList from './WordList.js';

new Fleet.TabSwitcher('HeadTab', 'active');
const wordList = new WordList('WordList');

class RecordForm extends Fleet {

  constructor(f, WordList) {
    super(f);

    this.wordList = WordList;
  }

  addWord(e) {
    e.preventDefault();
    const today = this.getDate();
    const dataStr = localStorage.getItem('wordData');
    const data = JSON.parse(dataStr);
    const lastWord = data[data.length - 1];
    const word = this.$word.value;
    const exp = this.$exp.value;

    if (lastWord?.d === today) {
      this.addWordItem(word, exp);
      lastWord.ws.push({w: word, e: exp});
    }
    else {
      data.push({
        d: today,
        ws: [{w: word, e: exp}]
      });
      this.wordList.initPage(data);
    }

    localStorage.setItem('wordData', JSON.stringify(data));
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

  getDate(format) {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    return [y, m, d].join(format || '-');
  }
}

new RecordForm('RecordForm', wordList);