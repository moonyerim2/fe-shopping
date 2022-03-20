/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
class Storage {
  constructor(keys) {
    this.getLocalStorage(keys);
  }

  getLocalStorage(keys) {
    for (const key in keys) {
      this[key] = this.getItem(key);
    }
  }

  setItem(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  storeInput(keyData, inputValue) {
    const { key, dataLength } = keyData;
    if (!this[key]) {
      this.setItem(key, [inputValue]);
    } else if (this[key].length < dataLength) {
      this[key].push(inputValue);
      this.setItem(key, [...new Set(this[key])]);
    }
  }
}

export { Storage };
