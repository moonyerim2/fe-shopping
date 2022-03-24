import { DomUtil } from '../../base/js/DomUtil.js';
import { TopBar } from './top-bar/topBar.js';
import { ProductSearchForm } from './product-search-form/productSearchForm.js';
import { Gnb } from './gnb/gnb.js';

class Header {
  constructor() {
    this.CLASSNAME = 'header';
    this.topBar = new TopBar();
    this.productSearchForm = new ProductSearchForm();
    this.gnb = new Gnb();
    this.template = this.template();
  }

  addEvent($startingDom) {
    const $trigger = DomUtil.getElementByClassName(
      $startingDom,
      this.CLASSNAME,
    );
    this.productSearchForm.addEvent($trigger);
  }

  template() {
    return `${this.topBar.template}
      <header class="header">    
        <button class="header__category-btn">카테고리</button>
        <section>
          <div class="flex">
            <h1>
              <a href="#" class="header__logo">coupang</a>
            </h1>
            ${this.productSearchForm.template}
          </div>
          ${this.gnb.template}
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

export { Header };
