class Util {
  static sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  static getElementByClassName($startingDom, className) {
    return $startingDom.querySelector(`.${className}`);
  }
}

export { Util };
