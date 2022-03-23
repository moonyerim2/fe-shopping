class Timer {
  constructor() {
    this.timer = null;
  }

  debounce(fn, ms = 500) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(fn, ms);
  }
}

export { Timer };
