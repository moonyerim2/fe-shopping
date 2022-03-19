/* eslint-disable no-param-reassign */
/* eslint-disable arrow-parens */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { DomUtil } from '../../../../base/js/DomUtil.js';
import { Util } from '../../../../base/js/util.js';

/* eslint-disable import/prefer-default-export */
class SearchTermModal {
  constructor() {
    this.CLASSNAME = {
      MODAL: 'search-term-modal',
      LIST: 'search-term-modal__list',
      LIST_ITEM: 'search-term-modal__list-item',
    };
    this.template = this.template();
  }

  getModalNode() {
    return Util.getElementByClassName(document, this.CLASSNAME.MODAL);
  }

  fetchAutoCompleteSearchTerms(inputValue) {
    const url = `https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${inputValue}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`;
    return Util.fetchMatchingData(url);
  }

  insertAutoComptetingList(modal, inputValue) {
    return this.fetchAutoCompleteSearchTerms(inputValue)
      .then(dataList => {
        if (!dataList.length) {
          DomUtil.hidden(modal);
        } else {
          DomUtil.visible(modal);
          const liTemplate = this.makeTermList(dataList);
          const ulTemplate = `<ul class = ${this.CLASSNAME.LIST}>${liTemplate}</ul>`;
          modal.innerHTML = ulTemplate;
        }
      })
      .catch(err => console.error(err));
  }

  insertRecentSearchList(modal) {
    DomUtil.visible(modal);
    modal.innerHTML = this.recentSearchTermTemplate();
    // inputValue가 비었다
    // fetch 하지말고 로컬스토리지에서 dataList 가져오기
  }

  insertTermList(modal, inputValue) {
    if (!inputValue) {
      this.insertRecentSearchList(modal);
    } else {
      this.insertAutoComptetingList(modal, inputValue);
    }
    return modal;
  }

  makeTermList(dataList) {
    return dataList.reduce(
      (template, data) =>
        `${template}<li class=${this.CLASSNAME.LIST_ITEM}>${data}</li>`,
      '',
    );
  }

  recentSearchTermTemplate() {
    return `<div class="search-term-modal__title">최근 검색어</div>
      <ul class = ${this.CLASSNAME.LIST}></ul>
      <div class="search-term-modal__under-bar">
        <button>전체삭제</button>
        <button>최근검색어끄기</button>
      </div>`;
  }

  template() {
    return `<div class=${this.CLASSNAME.MODAL}>
      ${this.recentSearchTermTemplate()}
    </div>`;
  }
}

export { SearchTermModal };
