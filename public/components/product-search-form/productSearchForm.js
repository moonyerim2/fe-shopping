class ProductSearchForm extends HTMLElement{
  constructor() {
    super();
    this.innerHTML = this.template();
  }

  template() {
    return `<form class="product-search-form">
      <div class="product-search-form__category">전체</div>
      <label class="size-0" for="productSearchInput"></label>
      <input type="text" id="productSearchInput" class="product-search-form__input" title="쿠팡 상품 검색" placeholder="찾고 싶은 상품을 검색해보세요"/>
    </form>`;
  }
}

window.customElements.define('product-search-form', ProductSearchForm);

export default ProductSearchForm;
