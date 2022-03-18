/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { Util } from '../../../../base/js/util.js';
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

  renderSearchTermModal(target, inputValue) {
    const modalNode = this.searchTermModal.createModalNode(inputValue);
    if (Util.isPromise(modalNode)) {
      modalNode.then(modalNode => target.after(modalNode));
    } else {
      target.after(modalNode);
    }
  }

  deleteSearchTermModal() {
    const modalNode = this.searchTermModal.getModalNode();
    if (!modalNode) {
      return;
    }
    modalNode.remove();
  }

  focusEventHandler({ target }) {
    if (target.className === this.CLASSNAME.INPUT) {
      const inputValue = target.value;
      // this.renderSearchTermModal(target, inputValue);
    }
  }

  blurEventHandler({ target }) {
    if (target.className !== this.CLASSNAME.INPUT) {
      this.deleteSearchTermModal();
    }
  }

  keyupEventHandler({ target }) {
    const inputValue = target.value;
    this.deleteSearchTermModal();
    this.renderSearchTermModal(target, inputValue);
  }

  addEvent($startingDom) {
    const $trigger = Util.getElementByClassName(
      $startingDom,
      this.CLASSNAME.FORM,
    );

    // focusout 왜 안되지
    $trigger.addEventListener('click', this.focusEventHandler.bind(this));
    // $trigger.addEventListener('focusout', this.blurEventHandler.bind(this));
    document.body.addEventListener('click', this.blurEventHandler.bind(this));
    $trigger.addEventListener('keyup', this.keyupEventHandler.bind(this));
  }

  template() {
    return `<form class="${this.CLASSNAME.FORM}">
      <div class="product-search-form__category">전체</div>
      <label class="size-0" for="productSearchInput"></label>
      <input type="text" id="productSearchInput" class="${this.CLASSNAME.INPUT}" title="쿠팡 상품 검색" placeholder="찾고 싶은 상품을 검색해보세요"/>
    </form>`;
  }
}

export { ProductSearchForm };
