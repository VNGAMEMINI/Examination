const RESULT_STATUS = Object.freeze({
  CORRECT: "correct",
  INCORRECT: "incorrect",
  UNANSWERED: "unanswered"
});

function normalizeValues(value) {
  if (value === undefined || value === null) {
    return [];
  }

  const values = Array.isArray(value)
    ? value
    : [value];

  return [...new Set(values.map(String))];
}

export default class Result {
  #status;
  #expected;
  #actual;

  constructor({
    status,
    expected = [],
    actual = []
  }) {
    if (!Object.values(RESULT_STATUS).includes(status)) {
      throw new TypeError(
        `Invalid result status: ${status}`
      );
    }

    this.#status = status;
    this.#expected = normalizeValues(expected);
    this.#actual = normalizeValues(actual);
  }

  get status() {
    return this.#status;
  }

  get expected() {
    return [...this.#expected];
  }

  get actual() {
    return [...this.#actual];
  }

  get correct() {
    return this.#status === RESULT_STATUS.CORRECT;
  }

  toJSON() {
    return {
      status: this.#status,
      expected: [...this.#expected],
      actual: [...this.#actual],
      correct: this.correct
    };
  }

  static get STATUS() {
    return RESULT_STATUS;
  }
}
