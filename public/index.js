import TopBar from './components/header/top-bar/topBar.js';
import Gnb from './components/header/gnb/gnb.js';
import { ProductSearchForm } from './components/header/product-search-form/js/productSearchForm.js';
import { AutoTextMaker } from './components/header/product-search-form/js/autoTextMaker.js';

import Header from './components/header/Header.js';

class App {
  constructor() {
    this.render();
    new AutoTextMaker();
  }

  render() {
    const header = new Header();
    document.querySelector('#root').appendChild(header);
  }
}

new App();
