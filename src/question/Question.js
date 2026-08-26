import AnswerCollection from "../answer/AnswerCollection.js";

class Question {
  #id;
  #text;
  #answers;
  #type;
  #metadata;

  constructor({
    id = null,
    text = "",
    answers = new AnswerCollection(),
    type = "single",
    metadata = {}
  } = {}) {
    if (!(answers instanceof AnswerCollection)) {
      throw new TypeError(
        "Question answers must be an AnswerCollection"
      );
    }

    this.#id = id;
    this.#text = text;
    this.#answers = answers;
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
}

export default Question;
