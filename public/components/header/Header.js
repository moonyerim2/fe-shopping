import { ProductSearchForm } from './product-search-form/js/productSearchForm.js';

class Header {
  constructor() {
    this.CLASSNAME = 'header';
    this.creatInnerComponents();
    this.template = this.template();
  }
  
  creatInnerComponents() {
    this.productSearchForm = new ProductSearchForm();
  }
  
  addEvent($startingDom) {
    const $trigger = $startingDom.querySelector(`.${this.CLASSNAME}`);
    this.productSearchForm.addEvent($trigger);
  }
  
  template() {
    return `<top-bar></top-bar>
      <header class="header">    
        <button class="header__category-btn">카테고리</button>
        <section>
          <div class="flex">
            <h1>
              <a href="#" class="header__logo">coupang</a>
            </h1>
            ${this.productSearchForm.template}
          </div>
          <nav-gnb></nav-gnb>
        </section>
        <ul class="header__icon-menu">
          <li class="icon-menu__my-coupang">
            <a href="#">
              <span class="icon-menu__icon-box">
                <span class="icon-menu__icon"/></span>
              </span>
              <span>마이쿠팡</span>
            </a>
          </li>
          <li class="icon-menu__cart">
            <a href="#">
              <span class="icon-menu__icon-box">
                <span class="icon-menu__icon"></span>
              </span>
              <span>장바구니</span>
            </a>
          </li>
        </ul>
      </header>`;
  }
}

export default Header;
