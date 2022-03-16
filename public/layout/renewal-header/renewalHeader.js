class RenewalHeader extends HTMLElement{
  constructor() {
    super();
    this.innerHTML = this.template();
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
            <product-search-form></product-search-form>
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

window.customElements.define('renewal-header', RenewalHeader);

export default RenewalHeader;
