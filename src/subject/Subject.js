import QuestionCollection from "../question/QuestionCollection.js";

class Subject {
  #id;
  #name;
  #questions;
  #metadata;

  constructor({
    id = null,
    name = "",
    questions = new QuestionCollection(),
    metadata = {}
  } = {}) {
    if (!(questions instanceof QuestionCollection)) {
      throw new TypeError(
        "Subject questions must be a QuestionCollection"
      );
    }

    this.#id = id;
    this.#name = name;
    this.#questions = questions;
    this.#metadata = metadata;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get questions() {
    return this.#questions;
  }

  get metadata() {
    return this.#metadata;
  }
}

export default Subject;
