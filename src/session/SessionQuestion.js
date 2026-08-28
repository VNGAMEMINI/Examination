import Question from "../question/Question.js";

class SessionQuestion {
  #question;
  #subjectIndex;
  #questionIndex;

  constructor({ question, subjectIndex, questionIndex } = {}) {
    if (!(question instanceof Question)) {
      throw new TypeError("SessionQuestion question must be a Question");
    }

    if (!Number.isInteger(subjectIndex) || subjectIndex < 0) {
      throw new TypeError(
        "SessionQuestion subjectIndex must be a non-negative integer",
      );
    }

    if (!Number.isInteger(questionIndex) || questionIndex < 0) {
      throw new TypeError(
        "SessionQuestion questionIndex must be a non-negative integer",
      );
    }

    this.#question = question;
    this.#subjectIndex = subjectIndex;
    this.#questionIndex = questionIndex;
  }

  get id() {
    return this.#question.id;
  }

  get text() {
    return this.#question.text;
  }

  get answers() {
    return this.#question.answers;
  }

  get question() {
    return this.#question;
  }

  get subjectIndex() {
    return this.#subjectIndex;
  }

  get questionIndex() {
    return this.#questionIndex;
  }
}

export default SessionQuestion;
