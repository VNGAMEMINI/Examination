import Summary from "../summary/Summary.js";

export default class Score {
  #points;
  #percentage;

  constructor(summary) {
    if (!(summary instanceof Summary)) {
      throw new TypeError("Score requires a Summary instance.");
    }

    this.#points = summary.correct;

    this.#percentage =
      summary.total === 0 ? 0 : (summary.correct / summary.total) * 100;
  }

  get points() {
    return this.#points;
  }

  get percentage() {
    return this.#percentage;
  }

  toJSON() {
    return {
      points: this.#points,
      percentage: this.#percentage,
    };
  }
}
