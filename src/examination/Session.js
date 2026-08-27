import Examination from "./Examination.js";

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
    answers = {},
    started = false,
    completed = false,
    metadata = {},
  } = {}) {
    if (!(examination instanceof Examination)) {
      throw new TypeError("Session examination must be an Examination");
    }

    this.#id = id;
    this.#examination = examination;
    this.#answers = answers;
    this.#started = started;
    this.#completed = completed;
    this.#metadata = metadata;
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

  get metadata() {
    return this.#metadata;
  }
}

export default Session;
