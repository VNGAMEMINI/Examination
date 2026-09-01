const STATUS = Object.freeze({
  CORRECT: "correct",
  INCORRECT: "incorrect",
  UNANSWERED: "unanswered"
});

export default class Summary {
  static STATUS = STATUS;

  #total;
  #correct;
  #incorrect;
  #unanswered;

  constructor(results) {
    if (!Array.isArray(results)) {
      throw new TypeError(
        "Summary requires an array of Result instances."
      );
    }

    this.#total = results.length;
    this.#correct = 0;
    this.#incorrect = 0;
    this.#unanswered = 0;

    for (const result of results) {
      if (!result || typeof result.status !== "string") {
        throw new TypeError(
          "Summary requires valid Result instances."
        );
      }

      switch (result.status) {
        case STATUS.CORRECT:
          this.#correct++;
          break;

        case STATUS.INCORRECT:
          this.#incorrect++;
          break;

        case STATUS.UNANSWERED:
          this.#unanswered++;
          break;

        default:
          throw new TypeError(
            `Unknown result status: ${result.status}`
          );
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
      unanswered: this.#unanswered
    };
  }
}
