/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { Util } from '../../../../base/js/util.js';
import { DomUtil } from '../../../../base/js/DomUtil.js';
import { SearchTermModal } from './searchTermModal.js';

class ProductSearchForm {
  constructor() {
    this.creatInnerComponents();
    this.CLASSNAME = {
      FORM: 'product-search-form',
      INPUT: 'product-search-form__input',
    };
    this.template = this.template();
  }

  creatInnerComponents() {
    this.searchTermModal = new SearchTermModal();
  }

  focusinEventHandler({ target }) {
    if (!target.value) {
      const modalNode = this.searchTermModal.getModalNode();
      DomUtil.visible(modalNode);
    }
  }

  focusoutEventHandler() {
    const modalNode = this.searchTermModal.getModalNode();
    DomUtil.hidden(modalNode);
  }

  inputEventHandler({ target }) {
    const modalNode = this.searchTermModal.getModalNode();
    this.searchTermModal.insertTermList(modalNode, target.value);
  }

  addEvent($startingDom) {
    const $trigger = Util.getElementByClassName(
      $startingDom,
      this.CLASSNAME.FORM,
    );

    $trigger.addEventListener('focusin', this.focusinEventHandler.bind(this));
    $trigger.addEventListener('focusout', this.focusoutEventHandler.bind(this));
    $trigger.addEventListener(
      'input',
      Util.debounce(this.inputEventHandler.bind(this), 200),
    );
  }

  template() {
    return `<form class="${this.CLASSNAME.FORM}">
      <div class="product-search-form__category">전체</div>
      <label class="size-0" for="productSearchInput"></label>
      <input type="text" id="productSearchInput" class="${this.CLASSNAME.INPUT}" title="쿠팡 상품 검색" placeholder="찾고 싶은 상품을 검색해보세요"/>
      ${this.searchTermModal.template}
    </form>`;
  }
}

export { ProductSearchForm };
