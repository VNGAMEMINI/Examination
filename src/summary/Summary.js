import Result from "../result/Result.js";

export default class Summary {
  #total;
  #correct;
  #incorrect;
  #unanswered;

  constructor(results) {
    if (!Array.isArray(results)) {
      throw new TypeError("Summary requires an array of Result instances.");
    }

    this.#total = results.length;
    this.#correct = 0;
    this.#incorrect = 0;
    this.#unanswered = 0;

    for (const result of results) {
      if (!(result instanceof Result)) {
        throw new TypeError("Summary requires valid Result instances.");
      }

      switch (result.status) {
        case Result.STATUS.CORRECT:
          this.#correct++;
          break;

        case Result.STATUS.INCORRECT:
          this.#incorrect++;
          break;

        case Result.STATUS.UNANSWERED:
          this.#unanswered++;
          break;

        default:
          throw new TypeError(`Unknown result status: ${result.status}`);
      }
    }
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

  toJSON() {
    return {
      total: this.#total,
      correct: this.#correct,
      incorrect: this.#incorrect,
      unanswered: this.#unanswered,
    };
  }
}
