import Header from './components/header/Header.js';

class App {
  constructor() {
    this.initPage();
  }

  creatInnerComponents() {
    return {
      header: new Header(),
    };
  }

  initPage() {
    const { header } = this.creatInnerComponents();

    const $root = document.querySelector('#root');
    $root.insertAdjacentHTML('beforeend', header.template);

    header.addEvent($root);
  }
}

new App();
