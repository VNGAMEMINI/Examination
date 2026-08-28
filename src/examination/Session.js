import Examination from "./Examination.js";
import normalizeSessionAnswers from "../data/normalizeSessionAnswers.js";
import SESSION_STATES from "./sessionStates.js";
import evaluateExamination from "../evaluation/evaluateExamination.js";
import Score from "../score/Score.js";

class Session {
  #id;
  #examination;
  #answers;
  #started;
  #completed;
  #metadata;

  constructor({
    id = null,
    examination,
    answers = [],
    started = false,
    completed = false,
    metadata = {},
  } = {}) {
    if (!(examination instanceof Examination)) {
      throw new TypeError("Session examination must be an Examination");
    }

    this.#id = id;
    this.#examination = examination;
    this.#answers = normalizeSessionAnswers(answers);
    this.#started = started;
    this.#completed = completed;
    this.#metadata = metadata;
  }

  start() {
    if (this.#completed) {
      throw new Error("Cannot start a completed Session");
    }

    this.#started = true;

    return this;
  }

  complete() {
    if (!this.#started) {
      throw new Error("Cannot complete a Session that has not started");
    }

    this.#completed = true;

    return this;
  }

  answer(subjectIndex, questionIndex, selection) {
    if (!this.#started) {
      throw new Error("Cannot answer a Session that has not started");
    }

    if (this.#completed) {
      throw new Error("Cannot answer a completed Session");
    }

    if (!Number.isInteger(subjectIndex) || subjectIndex < 0) {
      throw new TypeError(
        "Session subject index must be a non-negative integer",
      );
    }

    if (!Number.isInteger(questionIndex) || questionIndex < 0) {
      throw new TypeError(
        "Session question index must be a non-negative integer",
      );
    }

    const subject = this.#examination.subjects.get(subjectIndex);

    if (!subject) {
      throw new RangeError("Session subject index is out of range");
    }

    const question = subject.questions.get(questionIndex);

    if (!question) {
      throw new RangeError("Session question index is out of range");
    }

    if (!Array.isArray(this.#answers[subjectIndex])) {
      this.#answers[subjectIndex] = [];
    }

    this.#answers[subjectIndex][questionIndex] = Array.isArray(selection)
      ? [...selection]
      : selection;

    return this;
  }

  evaluate() {
    if (!this.#started) {
      throw new Error("Cannot evaluate a Session that has not started");
    }

    const evaluation = evaluateExamination(this.#examination, this.#answers);

    const score = Score.fromEvaluation(evaluation);

    return score.toResult();
  }

  get id() {
    return this.#id;
  }

  get examination() {
    return this.#examination;
  }

  get answers() {
    return this.#answers;
  }

  get started() {
    return this.#started;
  }

  get completed() {
    return this.#completed;
  }

  get state() {
    if (this.#completed) {
      return SESSION_STATES.COMPLETED;
    }

    if (this.#started) {
      return SESSION_STATES.STARTED;
    }

    return SESSION_STATES.CREATED;
  }

  get metadata() {
    return this.#metadata;
  }
}

export default Session;
