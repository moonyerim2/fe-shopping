class TopBar {
  constructor() {
    this.template = this.template();
    this.style = {
      background: '#f0f0f0',
    };
  }

  template() {
    return `<div class="top-bar">
      <div class="top-bar__inner">
        <ul class="flex">
        <li class="li-item">즐겨찾기</li>
        <li class="li-item">입점신청</li>
        </ul>
        <ul class="flex">
        <li class="li-item">로그인</li>
        <li class="li-item">회원가입</li>
        <li class="li-item">고객센터</li>
        </ul>
      </div>
    </div>`;
  }
}

export { TopBar };
