import { DomUtil } from '../../../../base/js/DomUtil.js';

class CategoryList {
  constructor() {
    this.CLASSNAME = {
      BOX: 'form-category',
      TITLE: 'form-category__title',
      LIST: 'form-category__list',
      ITEM: 'form-category__list-item',
    };
    this.template = this.template();
  }

  getCategoryBox() {
    return DomUtil.getElementByClassName(document, this.CLASSNAME.BOX);
  }

  getCategoryList() {
    return DomUtil.getElementByClassName(
      this.getCategoryBox(),
      this.CLASSNAME.LIST,
    );
  }

  addEvent() {
    const $categoryBox = this.getCategoryBox();
    const $categoryList = this.getCategoryList();

    $categoryBox.addEventListener('focusin', () => {
      DomUtil.visible($categoryList);
    });
    $categoryBox.addEventListener('focusout', () => {
      DomUtil.hidden($categoryList);
    });
  }

  template() {
    return `<div tabindex='0' class="${this.CLASSNAME.BOX}">
      <div class="${this.CLASSNAME.TITLE}">전체</div>
      <ul class="${this.CLASSNAME.LIST}">
        <li class="${this.CLASSNAME.ITEM}">전체</li>
        <li class="${this.CLASSNAME.ITEM}">여성패션</li>
        <li class="${this.CLASSNAME.ITEM}">남성패션</li>
        <li class="${this.CLASSNAME.ITEM}">남녀 공용 의류</li>
        <li class="${this.CLASSNAME.ITEM}">유아동패션</li>
       </ul>
    </div>`;
  }
}

export { CategoryList };
