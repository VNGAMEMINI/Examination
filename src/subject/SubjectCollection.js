import Subject from "./Subject.js";

class SubjectCollection {
  #items = [];

  constructor(items = []) {
    for (const item of items) {
      this.add(item);
    }
  }

  get length() {
    return this.#items.length;
  }

  add(subject) {
    if (!(subject instanceof Subject)) {
      throw new TypeError("SubjectCollection only accepts Subject instances");
    }

    this.#items.push(subject);

    return subject;
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

export default SubjectCollection;
