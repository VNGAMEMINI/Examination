import AnswerCollection from "../answer/AnswerCollection.js";

class Question {
  #id;
  #text;
  #answers;
  #type;
  #metadata;

  constructor(textOrOptions, answers) {
    let id;
    let text;
    let questionAnswers;
    let type;
    let metadata;

    if (
      textOrOptions !== null &&
      typeof textOrOptions === "object" &&
      !Array.isArray(textOrOptions)
    ) {
      ({
        id = null,
        text = "",
        answers: questionAnswers = new AnswerCollection(),
        type = "single",
        metadata = {},
      } = textOrOptions);
    } else {
      id = null;
      text = textOrOptions ?? "";
      questionAnswers =
        answers ?? new AnswerCollection();
      type = "single";
      metadata = {};
    }

    if (!(questionAnswers instanceof AnswerCollection)) {
      throw new TypeError(
        "Question answers must be an AnswerCollection"
      );
    }

    this.#id = id;
    this.#text = text;
    this.#answers = questionAnswers;
    this.#type = type;
    this.#metadata = metadata;
  }

  get id() {
    return this.#id;
  }

  get text() {
    return this.#text;
  }

  get answers() {
    return this.#answers;
  }

  get type() {
    return this.#type;
  }

  get metadata() {
    return this.#metadata;
  }

  toJSON() {
    return {
      id: this.#id,
      text: this.#text,
      answers: this.#answers.toArray(),
      type: this.#type,
      metadata: this.#metadata,
    };
  }
}

export default Question;
