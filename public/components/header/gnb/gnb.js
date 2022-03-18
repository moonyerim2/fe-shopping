class Gnb {
  constructor() {
    this.template = this.template();
  }

  template() {
    return `<ul class="gnb">
        <li class="gnb-item"><a href="#"> 로켓배송 </a></li>
        <li class="gnb-item"><a href="#"> 쿠팡비즈 </a></li>
        <li class="gnb-item"><a href="#"> 로켓프레시 </a></li>
        <li class="gnb-item"><a href="#"> 로켓직구 </a></li>
        <li class="gnb-item"><a href="#"> 골드박스 </a></li>
        <li class="gnb-item"><a href="#"> 와우회원할인 </a></li>
        <li class="gnb-item"><a href="#"> 로켓배송 </a></li>
        <li class="gnb-item"><a href="#"> 이벤트 </a></li>
        <li class="gnb-item"><a href="#"> 기획전 </a></li>
        <li class="gnb-item"><a href="#"> 여행/티켓 </a></li>
      </ul>`;
  }
}

export { Gnb };
