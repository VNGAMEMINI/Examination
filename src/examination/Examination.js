import SubjectCollection from "../subject/SubjectCollection.js";

class Examination {
  #subjects;
  #metadata;

  constructor({
    subjects = new SubjectCollection(),
    metadata = {}
  } = {}) {
    if (!(subjects instanceof SubjectCollection)) {
      throw new TypeError(
        "Examination subjects must be a SubjectCollection"
      );
    }

    this.#subjects = subjects;
    this.#metadata = metadata;
  }

  get subjects() {
    return this.#subjects;
  }

  get metadata() {
    return this.#metadata;
  }
}

export default Examination;
