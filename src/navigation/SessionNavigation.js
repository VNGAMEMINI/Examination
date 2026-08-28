import SessionQuestionCollection from "../session/SessionQuestionCollection.js";

class SessionNavigation {
  #questions;
  #currentIndex;

  constructor(questions) {
    if (!(questions instanceof SessionQuestionCollection)) {
      throw new TypeError(
        "SessionNavigation questions must be a SessionQuestionCollection",
      );
    }

    this.#questions = questions;
    this.#currentIndex = 0;
  }

  next() {
    if (this.hasNext) {
      this.#currentIndex += 1;
    }

    return this;
  }

  previous() {
    if (this.hasPrevious) {
      this.#currentIndex -= 1;
    }

    return this;
  }

  first() {
    this.#currentIndex = 0;

    return this;
  }

  last() {
    if (this.#questions.length > 0) {
      this.#currentIndex = this.#questions.length - 1;
    }

    return this;
  }

  get questions() {
    return this.#questions;
  }

  get currentIndex() {
    return this.#currentIndex;
  }

  get current() {
    return this.#questions.get(this.#currentIndex);
  }

  get hasNext() {
    return this.#currentIndex < this.#questions.length - 1;
  }

  get hasPrevious() {
    return this.#currentIndex > 0;
  }
}

export default SessionNavigation;
