class Evaluation {
  #total;
  #correct;
  #incorrect;
  #unanswered;
  #subjects;
  #metadata;

  constructor({
    total = 0,
    correct = 0,
    incorrect = 0,
    unanswered = 0,
    subjects = [],
    metadata = {},
  } = {}) {
    this.#total = total;
    this.#correct = correct;
    this.#incorrect = incorrect;
    this.#unanswered = unanswered;
    this.#subjects = subjects;
    this.#metadata = metadata;
  }

  get total() {
    return this.#total;
  }

  get correct() {
    return this.#correct;
  }

  get incorrect() {
    return this.#incorrect;
  }

  get unanswered() {
    return this.#unanswered;
  }

  get subjects() {
    return this.#subjects;
  }

  get metadata() {
    return this.#metadata;
  }
}

export default Evaluation;
