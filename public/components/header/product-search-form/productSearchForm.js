/* eslint-disable arrow-parens */
import { Util } from '../../../base/js/util.js';
import { DomUtil } from '../../../base/js/DomUtil.js';
import { SearchTermModal } from './search-term-modal/searchTermModal.js';

class ProductSearchForm {
  constructor() {
    this.CLASSNAME = {
      FORM: 'product-search-form',
      INPUT: 'product-search-form__input',
    };
    this.searchTermModal = new SearchTermModal();
    this.template = this.template();
  }

  focusinEventHandler(modalNode) {
    if (modalNode.innerHTML === '') {
      DomUtil.hidden(modalNode);
    } else {
      DomUtil.visible(modalNode);
    }
  }

  focusoutEventHandler(modalNode) {
    DomUtil.hidden(modalNode);
  }

  inputEventHandler(modalNode, { target }) {
    this.searchTermModal.insertTermList(modalNode, target.value);
  }

  submitEventHandler(e) {
    e.preventDefault();
    const $input = Util.getElementByClassName(e.target, this.CLASSNAME.INPUT);
    const keyData = this.searchTermModal.STORAGE_KEYS.recentSearchTerms;
    if ($input.value) {
      this.searchTermModal.storage.storeInput(keyData, $input.value);
    }
  }

  checkSelectedItem(termList, className) {
    for (let i = 0; i < termList.length; i++) {
      if (termList[i].classList.contains(className)) {
        return i;
      }
      if (i === termList.length - 1) {
        return null;
      }
    }
  }

  downKeyHandler(termList, className) {
    const currentIndex = this.checkSelectedItem(termList, className);

    if (currentIndex === null) {
      termList[0].classList.add(className);
    } else if (currentIndex === termList.length - 1) {
      termList[currentIndex].classList.remove(className);
      termList[0].classList.add(className);
    } else {
      termList[currentIndex].classList.remove(className);
      termList[currentIndex].nextElementSibling.classList.add(className);
    }
  }

  upKeyHandler(termList, className) {
    const currentIndex = this.checkSelectedItem(termList, className);

    if (currentIndex !== null && !currentIndex) {
      termList[currentIndex].classList.remove(className);
    } else {
      termList[currentIndex].classList.remove(className);
      termList[currentIndex].previousElementSibling.classList.add(className);
    }
  }

  keydownEventHandler(modalNode, e) {
    const className = `${this.searchTermModal.CLASSNAME.LIST_ITEM}__select`;
    const termList = Util.getElementByClassName(
      modalNode,
      this.searchTermModal.CLASSNAME.LIST,
    ).children;

    if (e.keyCode === 40) {
      this.downKeyHandler(termList, className);
    }

    if (e.keyCode === 38) {
      this.upKeyHandler(termList, className);
    }
  }

  addEvent($startingDom) {
    const modalNode = this.searchTermModal.getModalNode();
    const $trigger = Util.getElementByClassName(
      $startingDom,
      this.CLASSNAME.FORM,
    );

    $trigger.addEventListener('focusin', () =>
      this.focusinEventHandler(modalNode),
    );
    $trigger.addEventListener('focusout', () =>
      this.focusoutEventHandler(modalNode),
    );
    $trigger.addEventListener('input', e =>
      Util.debounce(this.inputEventHandler(modalNode, e), 500),
    );
    $trigger.addEventListener('keydown', e =>
      this.keydownEventHandler(modalNode, e),
    );
    $trigger.addEventListener('submit', e => this.submitEventHandler(e));

    this.searchTermModal.addEvent();
  }

  template() {
    return `<form class="${this.CLASSNAME.FORM}">
      <div class="product-search-form__category">전체</div>
      <label class="size-0" for="productSearchInput"></label>
      <input type="text" id="productSearchInput" class="${this.CLASSNAME.INPUT}" title="쿠팡 상품 검색" placeholder="찾고 싶은 상품을 검색해보세요"/>
      <input type="submit" value="" class="product-search-form__btn"/>
      ${this.searchTermModal.template}
    </form>`;
  }
}

export { ProductSearchForm };
