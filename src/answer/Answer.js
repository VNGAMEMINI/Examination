class Answer {
  #value;
  #index;
  #correct;
  #metadata;

  constructor(valueOrOptions, options = {}) {
    let value;
    let index;
    let correct;
    let metadata;

    if (
      valueOrOptions !== null &&
      typeof valueOrOptions === "object" &&
      !Array.isArray(valueOrOptions)
    ) {
      ({ value, index = 0, correct = false, metadata = {} } = valueOrOptions);
    } else {
      value = valueOrOptions;

      ({ index = 0, correct = false, metadata = {} } = options);
    }

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

  toJSON() {
    return {
      value: this.#value,
      index: this.#index,
      correct: this.#correct,
      metadata: this.#metadata,
    };
  }
}

export default Answer;
