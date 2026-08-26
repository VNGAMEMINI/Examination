import Question from "./Question.js";

class QuestionCollection {
  #items = [];

  constructor(items = []) {
    for (const item of items) {
      this.add(item);
    }
  }

  get length() {
    return this.#items.length;
  }

  add(question) {
    if (!(question instanceof Question)) {
      throw new TypeError("QuestionCollection only accepts Question instances");
    }

    this.#items.push(question);

    return question;
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

export default QuestionCollection;
