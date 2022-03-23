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

  inputEventHandler({ target }) {
    this.searchTermModal.insertTermList(target.value);
  }

  submitEventHandler(e) {
    e.preventDefault();
    const $input = DomUtil.getElementByClassName(
      e.target,
      this.CLASSNAME.INPUT,
    );
    if (!$input.value) {
      return;
    }
    const keyData = this.searchTermModal.STORAGE_KEYS.recentSearchTerms;
    this.searchTermModal.storage.storeInput(keyData, $input.value);
  }

  downKeyHandler(inputBox, key) {
    const currentItem = this.searchTermModal.getCurrentSelectedItem();
    if (!currentItem || !currentItem.nextElementSibling) {
      inputBox.value = this.searchTermModal.selectFirstItem(currentItem);
    } else {
      inputBox.value = this.searchTermModal.selectItem(currentItem, key);
    }
  }

  upKeyHandler(inputBox, key) {
    const currentItem = this.searchTermModal.getCurrentSelectedItem();

    if (!currentItem) {
      return;
    }

    if (currentItem === this.searchTermModal.getFirstItem()) {
      this.searchTermModal.removeSelectedClass(currentItem);
    } else {
      inputBox.value = this.searchTermModal.selectItem(currentItem, key);
    }
  }

  keydownEventHandler({ isComposing, keyCode, target }, modalNode) {
    if (isComposing || modalNode.innerHTML === '') {
      return;
    }

    if (keyCode === 40) {
      this.downKeyHandler(target, 'down');
    }
    if (keyCode === 38) {
      this.upKeyHandler(target, 'up');
    }
  }

  addEvent($startingDom) {
    const modalNode = this.searchTermModal.getModalNode();
    const $trigger = DomUtil.getElementByClassName(
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
      Util.debounce(this.inputEventHandler(e), 500),
    );
    $trigger.addEventListener('keydown', e =>
      this.keydownEventHandler(e, modalNode),
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
