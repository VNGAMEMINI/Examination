import SessionQuestion from "./SessionQuestion.js";

class SessionQuestionCollection {
  #items = [];

  constructor(items = []) {
    for (const item of items) {
      this.add(item);
    }
  }

  get length() {
    return this.#items.length;
  }

  add(sessionQuestion) {
    if (!(sessionQuestion instanceof SessionQuestion)) {
      throw new TypeError(
        "SessionQuestionCollection only accepts SessionQuestion instances",
      );
    }

    this.#items.push(sessionQuestion);

    return sessionQuestion;
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

export default SessionQuestionCollection;
