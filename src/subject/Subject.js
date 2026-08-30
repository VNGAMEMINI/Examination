import QuestionCollection from "../question/QuestionCollection.js";

class Subject {
  #id;
  #name;
  #questions;
  #metadata;

  constructor(nameOrOptions, questions) {
    let id;
    let name;
    let subjectQuestions;
    let metadata;

    if (
      nameOrOptions !== null &&
      typeof nameOrOptions === "object" &&
      !Array.isArray(nameOrOptions)
    ) {
      ({
        id = null,
        name = "",
        questions: subjectQuestions = new QuestionCollection(),
        metadata = {},
      } = nameOrOptions);
    } else {
      id = null;
      name = nameOrOptions ?? "";
      subjectQuestions = questions ?? new QuestionCollection();
      metadata = {};
    }

    if (!(subjectQuestions instanceof QuestionCollection)) {
      throw new TypeError("Subject questions must be a QuestionCollection");
    }

    this.#id = id;
    this.#name = name;
    this.#questions = subjectQuestions;
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

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      questions: this.#questions.toArray(),
      metadata: this.#metadata,
    };
  }
}

export default Subject;
