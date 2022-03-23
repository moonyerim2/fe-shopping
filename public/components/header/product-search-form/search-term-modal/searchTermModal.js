import { DomUtil } from '../../../../base/js/DomUtil.js';
import { Storage } from '../../../../base/js/Storage.js';
import { FetchController } from '../../../../base/js/FetchController.js';

class SearchTermModal {
  constructor() {
    this.CLASSNAME = {
      MODAL: 'search-term-modal',
      LIST: 'search-term-modal__list',
      LIST_ITEM: 'search-term-modal__list-item',
      SELECTED_LIST_ITEM: 'search-term-modal__list-item__select',
    };
    this.STORAGE_KEYS = {
      recentSearchTerms: {
        key: 'recentSearchTerms',
        dataLength: 10,
      },
    };
    this.storage = new Storage(this.STORAGE_KEYS);
    this.autoCompleteTermFetchController = new FetchController();
    this.template = this.template(this.storage.recentSearchTerms);
  }

  getModalNode() {
    return DomUtil.getElementByClassName(document, this.CLASSNAME.MODAL);
  }

  getFirstItem() {
    return DomUtil.getElementByClassName(
      this.getModalNode(),
      this.CLASSNAME.LIST,
    ).firstElementChild;
  }

  getCurrentSelectedItem() {
    return DomUtil.getElementByClassName(
      this.getModalNode(),
      this.CLASSNAME.SELECTED_LIST_ITEM,
    );
  }

  fetchAutoCompleteSearchTerms(inputValue) {
    const url = `https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${inputValue}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`;
    return this.autoCompleteTermFetchController
      .fetch(url)
      .then(terms => terms.suggestions.map(v => v.value));
  }

  insertAutoComptetingList(modalNode, inputValue) {
    return this.fetchAutoCompleteSearchTerms(inputValue)
      .then(dataList => {
        if (!dataList.length) {
          DomUtil.hidden(modalNode);
          modalNode.innerHTML = '';
        } else {
          DomUtil.visible(modalNode);
          const liTemplate = this.makeTermList(dataList);
          const ulTemplate = `<ul class = ${this.CLASSNAME.LIST}>${liTemplate}</ul>`;
          modalNode.innerHTML = ulTemplate;
        }
      })
      .catch(err => console.error(err));
  }

  insertRecentSearchList(modalNode) {
    DomUtil.visible(modalNode);
    modalNode.innerHTML = this.recentSearchTermTemplate(
      this.storage.recentSearchTerms,
    );
  }

  insertTermList(inputValue) {
    const modalNode = this.getModalNode();
    if (!inputValue) {
      this.insertRecentSearchList(modalNode);
      this.autoCompleteTermFetchController.abort();
    } else {
      this.insertAutoComptetingList(modalNode, inputValue);
    }
    return modalNode;
  }

  removeSelectedClass(currentItem) {
    currentItem.classList.remove(this.CLASSNAME.SELECTED_LIST_ITEM);
  }

  selectFirstItem(currentItem) {
    const firstItem = this.getFirstItem();
    firstItem.classList.add(this.CLASSNAME.SELECTED_LIST_ITEM);

    if (currentItem && !currentItem.nextElementSibling) {
      currentItem.classList.remove(this.CLASSNAME.SELECTED_LIST_ITEM);
    }
    return firstItem.textContent;
  }

  getAfterItem(currentItem, key) {
    if (key === 'down') {
      return currentItem.nextElementSibling;
    }
    if (key === 'up') {
      return currentItem.previousElementSibling;
    }
  }

  selectItem(currentItem, key) {
    const afterItem = this.getAfterItem(currentItem, key);
    afterItem.classList.add(this.CLASSNAME.SELECTED_LIST_ITEM);
    this.removeSelectedClass(currentItem);
    return afterItem.textContent;
  }

  addEvent() {
    const modalNode = this.getModalNode();
    modalNode.addEventListener('mousedown', e => e.preventDefault());
  }

  makeTermList(dataList) {
    return dataList.reduce(
      (template, data) =>
        `${template}<li class=${this.CLASSNAME.LIST_ITEM}>${data}</li>`,
      '',
    );
  }

  recentSearchTermTemplate(dataList) {
    const ulTemplate = dataList
      ? `<ul class = ${this.CLASSNAME.LIST}>${this.makeTermList(dataList)}</ul>`
      : `<ul class = ${this.CLASSNAME.LIST}></ul>`;

    return `<div class="search-term-modal__title">최근 검색어</div>
      ${ulTemplate}
      <div class="search-term-modal__under-bar">
        <button>전체삭제</button>
        <button>최근검색어끄기</button>
      </div>`;
  }

  template(dataList) {
    return `<div class=${this.CLASSNAME.MODAL}>
      ${this.recentSearchTermTemplate(dataList)}
    </div>`;
  }
}

export { SearchTermModal };
