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

  static getElementByClassName($startingDom, className) {
    return $startingDom.querySelector(`.${className}`);
  }

  static isPromise(p) {
    return p && Object.prototype.toString.call(p) === '[object Promise]';
  }

  static fetchMatchingData = url =>
    fetch(url)
      .then(res => res.json())
      .then(data => data.suggestions.map(v => v.value));
}

export { Util };
