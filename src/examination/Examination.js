import SubjectCollection
  from "../subject/SubjectCollection.js";

class Examination {
  #id;
  #title;
  #subjects;
  #metadata;

  constructor({
    id = null,
    title = "",
    subjects = new SubjectCollection(),
    metadata = {}
  } = {}) {
    if (!(subjects instanceof SubjectCollection)) {
      throw new TypeError(
        "Examination subjects must be a SubjectCollection"
      );
    }

    this.#id = id;
    this.#title = title;
    this.#subjects = subjects;
    this.#metadata = metadata;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get subjects() {
    return this.#subjects;
  }

  get metadata() {
    return this.#metadata;
  }
}

export default Examination;
