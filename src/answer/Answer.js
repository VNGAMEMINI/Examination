class Answer {
  #value;
  #index;
  #correct;
  #metadata;

  constructor({
    value,
    index = 0,
    correct = false,
    metadata = {}
  } = {}) {
    this.#value = value;
    this.#index = index;
    this.#correct = correct;
    this.#metadata = metadata;
  }

  get value() {
    return this.#value;
  }

  get index() {
    return this.#index;
  }

  get correct() {
    return this.#correct;
  }

  get metadata() {
    return this.#metadata;
  }
}

export default Answer;
