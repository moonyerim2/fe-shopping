class DomUtil {
  static visible(element) {
    element.style.visibility = 'visible';
  }

  static hidden(element) {
    element.style.visibility = 'hidden';
  }

  static getElementByClassName($startingDom, className) {
    return $startingDom.querySelector(`.${className}`);
  }
}

export { DomUtil };
