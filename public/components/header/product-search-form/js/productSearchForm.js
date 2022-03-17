/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { Util } from '../../../../base/js/util.js';
import { fetchMatchingData } from './fetch.js';
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

  autoCompleteSearchTerm(inputValue) {
    const url = `https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${inputValue}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`;
    fetchMatchingData(url);
  }

  renderSearchTermModal(target, inputValue) {
    const modalNode = this.searchTermModal.createModalNode(inputValue);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(modalNode);
    target.after(fragment);
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
      this.renderSearchTermModal(target, inputValue);
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
    if (inputValue) {
      Util.sleep(500).then(() => this.autoCompleteSearchTerm(inputValue));
    }
  }

  addEvent($startingDom) {
    const $trigger = Util.getElementByClassName(
      $startingDom,
      this.CLASSNAME.FORM,
    );

    $trigger.addEventListener('click', this.focusEventHandler.bind(this));
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
