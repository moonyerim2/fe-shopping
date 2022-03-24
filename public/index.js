import { Header } from './components/header/Header.js';

class App {
  constructor() {
    this.initPage();
  }

  initPage() {
    const header = new Header();

    const $root = document.querySelector('#root');
    $root.insertAdjacentHTML('beforeend', header.template);

    header.addEvent($root);
  }
}

new App();
