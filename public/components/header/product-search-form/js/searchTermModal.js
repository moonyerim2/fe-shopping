/* eslint-disable no-param-reassign */
/* eslint-disable arrow-parens */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { Util } from '../../../../base/js/util.js';
import { fetchMatchingData } from './fetch.js';

/* eslint-disable import/prefer-default-export */
class SearchTermModal {
  constructor() {
    this.CLASSNAME = 'search-term-modal';
  }

  fetchAutoCompleteSearchTerms(inputValue) {
    const url = `https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${inputValue}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`;
    return Util.sleep(500).then(() => fetchMatchingData(url));
  }

  createModalNode(inputValue) {
    const ul = document.createElement('ul');
    ul.className = this.CLASSNAME;
    if (!inputValue) {
      return this.createRecentSearchModalNode(ul);
    }
    return this.createAutoComptetingModalNode(ul, inputValue);
  }

  createAutoComptetingModalNode(ul, inputValue) {
    return this.fetchAutoCompleteSearchTerms(inputValue)
      .then(dataList => {
        const fragmentliList = this.creatTermListNodes(dataList);
        ul.appendChild(fragmentliList);
        return ul;
      })
      .catch(err => console.error(err));
  }

  createRecentSearchModalNode(ul) {
    ul.innerHTML = '최근 검색어';
    return ul;
    // inputValue가 비었다
    // fetch 하지말고 로컬스토리지에서 dataList 가져오기
  }

  getModalNode() {
    return Util.getElementByClassName(document, this.CLASSNAME);
  }

  creatTermListNodes(dataList) {
    const fragment = document.createDocumentFragment();
    dataList.forEach(data => {
      const text = document.createTextNode(data);
      const li = document.createElement('li');
      li.appendChild(text);
      fragment.appendChild(li);
    });
    return fragment;
  }

  template() {
    return {
      autoCompletingTerm: `
        <li>자동완성</li>`,
      recentSearchTerm: `
        <li>최근검색어</li>`,
    };
  }
}

export { SearchTermModal };
