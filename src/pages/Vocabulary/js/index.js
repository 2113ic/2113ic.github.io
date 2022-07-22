import '/src/js/initTheme.js';
import WordList from './WordList.js';
import RecordForm from './RecordForm.js';

const wordList = new WordList('WordList');
new Fleet.TabSwitcher('HeadTab', 'active');
new RecordForm('RecordForm', wordList);