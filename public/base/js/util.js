/* eslint-disable no-promise-executor-return */
class Util {
  static sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  static debounce(f, ms) {
    let timer = null;

    return (...args) => {
      clearTimeout(timer);
      return new Promise(r => {
        timer = setTimeout(() => r(f(...args)), ms);
      });
    };
  }

  static isPromise(p) {
    return p && Object.prototype.toString.call(p) === '[object Promise]';
  }
}

export { Util };
