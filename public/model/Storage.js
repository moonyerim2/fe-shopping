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

  storeInput(key, currentData, inputValue) {
    if (!currentData) {
      this.setItem(key, [inputValue]);
    } else if (currentData.length <= 10) {
      currentData.push(inputValue);
      this.setItem(key, [...new Set(currentData)]);
    }
  }
}

export { Storage };
