import Answer from "./Answer.js";

class AnswerCollection {
  #items = [];

  constructor(items = []) {
    for (const item of items) {
      this.add(item);
    }
  }

  get length() {
    return this.#items.length;
  }

  add(answer) {
    if (!(answer instanceof Answer)) {
      throw new TypeError("AnswerCollection only accepts Answer instances");
    }

    this.#items.push(answer);

    return answer;
  }

  get(index) {
    return this.#items[index];
  }

  remove(index) {
    return this.#items.splice(index, 1)[0];
  }

  clear() {
    this.#items.length = 0;
  }

  [Symbol.iterator]() {
    return this.#items[Symbol.iterator]();
  }

  toArray() {
    return [...this.#items];
  }
}

export default AnswerCollection;
