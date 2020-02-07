import { ContextProvider } from "recyclerlistview/web";

export default class ContextHelper extends ContextProvider {
  constructor(uniqueKey) {
    super();
    this._uniqueKey = uniqueKey;
  }

  getUniqueKey() {
    return this._uniqueKey;
  }

  save(key, value) {
    localStorage.setItem(key, value);
  }

  get(key) {
    const value = parseInt(localStorage.getItem(key));
    if (isNaN(value)) {
      return 0;
    }
    return value;
  }

  remove(key) {
    localStorage.removeItem(`scroll_context_${key}`);
  }
}
