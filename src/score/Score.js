import Result from "../examination/Result.js";

class Score {
  #total;
  #correct;
  #incorrect;
  #unanswered;

  constructor({
    total = 0,
    correct = 0,
    incorrect = 0,
    unanswered = 0
  } = {}) {
    this.#total = total;
    this.#correct = correct;
    this.#incorrect = incorrect;
    this.#unanswered = unanswered;
  }

  static fromEvaluation(evaluation) {
    if (
      evaluation == null ||
      typeof evaluation !== "object"
    ) {
      throw new TypeError(
        "Score.fromEvaluation expects an evaluation object"
      );
    }

    return new Score({
      total: evaluation.total,
      correct: evaluation.correct,
      incorrect: evaluation.incorrect,
      unanswered: evaluation.unanswered
    });
  }

  toResult() {
    return new Result({
      total: this.#total,
      correct: this.#correct,
      incorrect: this.#incorrect,
      unanswered: this.#unanswered,
      score: this.points,
      percentage: this.percentage
    });
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

  get points() {
    return this.#calculatePoints();
  }

  get percentage() {
    if (this.#total === 0) {
      return 0;
    }

    return (this.#correct / this.#total) * 100;
  }

  #calculatePoints() {
    return this.#correct;
  }
}

export default Score;
