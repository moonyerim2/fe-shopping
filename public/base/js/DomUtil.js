class DomUtil {
  static visible(element) {
    element.style.visibility = 'visible';
  }

  static hidden(element) {
    element.style.visibility = 'hidden';
  }
}

export { DomUtil };
