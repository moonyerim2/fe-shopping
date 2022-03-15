class TopBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = this.template();
  }

  template() {
    return `<ul class="flex">
        <li>즐겨찾기</li>
        <li>입점신청</li>
      </ul>
      <ul class="flex">
        <li>로그인</li>
        <li>회원가입</li>
        <li>고객센터</li>
      </ul>`;
  }
}

window.customElements.define('top-bar', TopBar);

export default TopBar;
