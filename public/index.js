import TopBar from './components/top-bar/topBar.js';
import Gnb from './components/gnb/gnb.js';
import ProductSearchForm from './components/product-search-form/productSearchForm.js';
import RenewalHeader from './layout/renewal-header/renewalHeader.js';

class Controller {
  constructor() {
    this.render();
  }

  render() {
    const renewalHeader = new RenewalHeader();
    document.querySelector('#root').appendChild(renewalHeader);
    
  }
}

const controller = new Controller();
