/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { Util } from '../../../../base/js/util.js';

/* eslint-disable import/prefer-default-export */
class SearchTermModal {
  constructor() {
    this.CLASSNAME = 'search-term-modal';
  }

  createModalNode(inputValue) {
    const ul = document.createElement('ul');
    ul.className = this.CLASSNAME;

    const template = this.template();
    if (!inputValue) {
      ul.innerHTML = template.recentSearchTerm;
    } else {
      ul.innerHTML = template.autoCompletingTerm;
    }
    return ul;
  }

  getModalNode() {
    return Util.getElementByClassName(document, this.CLASSNAME);
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
