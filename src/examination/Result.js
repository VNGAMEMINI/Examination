class Result {
  #total;
  #correct;
  #incorrect;
  #unanswered;
  #score;
  #percentage;
  #metadata;

  constructor({
    total = 0,
    correct = 0,
    incorrect = 0,
    unanswered = 0,
    score = 0,
    percentage = 0,
    metadata = {},
  } = {}) {
    this.#total = total;
    this.#correct = correct;
    this.#incorrect = incorrect;
    this.#unanswered = unanswered;
    this.#score = score;
    this.#percentage = percentage;
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

  get score() {
    return this.#score;
  }

  get percentage() {
    return this.#percentage;
  }

  get metadata() {
    return this.#metadata;
  }
}

export default Result;
