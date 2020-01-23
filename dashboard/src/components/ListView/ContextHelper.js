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
    localStorage.setItem(`scroll_context_${key}`, value);
  }

  get(key) {
    console.log(parseInt(localStorage.getItem(`scroll_context_${key}`)) || 0);
    return parseInt(localStorage.getItem(`scroll_context_${key}`)) || 0;
  }

  remove(key) {
    localStorage.removeItem(`scroll_context_${key}`);
  }
}
