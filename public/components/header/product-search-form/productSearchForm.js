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

  checkSelectedItem(termLiItems, className) {
    for (let i = 0; i < termLiItems.length; i++) {
      if (termLiItems[i].classList.contains(className)) {
        return i;
      }
      if (i === termLiItems.length - 1) {
        return null;
      }
    }
  }

  downKeyHandler(termLiItems, className, inputBox) {
    const currentIndex = this.checkSelectedItem(termLiItems, className);

    if (currentIndex === null) {
      termLiItems[0].classList.add(className);
    } else if (currentIndex === termLiItems.length - 1) {
      termLiItems[currentIndex].classList.remove(className);
      termLiItems[0].classList.add(className);
    } else {
      termLiItems[currentIndex].classList.remove(className);
      termLiItems[currentIndex].nextElementSibling.classList.add(className);
      inputBox.value = termLiItems[currentIndex].nextElementSibling.textContent;
    }
  }

  upKeyHandler(termLiItems, className, inputBox) {
    const currentIndex = this.checkSelectedItem(termLiItems, className);
    if (currentIndex === null) {
      return;
    }

    if (currentIndex !== null && !currentIndex) {
      termLiItems[currentIndex].classList.remove(className);
    } else {
      termLiItems[currentIndex].classList.remove(className);
      termLiItems[currentIndex].previousElementSibling.classList.add(className);
      inputBox.value = termLiItems[currentIndex].previousElementSibling.textContent;
    }
  }

  keydownEventHandler(modalNode, e) {
    if (e.isComposing) return;

    const { keyCode, target } = e;
    const className = `${this.searchTermModal.CLASSNAME.LIST_ITEM}__select`;
    const termList = Util.getElementByClassName(
      modalNode,
      this.searchTermModal.CLASSNAME.LIST,
    );
    const termLiItems = termList ? termList.children : null;

    if (termLiItems && termLiItems.length) {
      if (keyCode === 40) {
        this.downKeyHandler(termLiItems, className, target);
      }

      if (keyCode === 38) {
        this.upKeyHandler(termLiItems, className, target);
      }
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
