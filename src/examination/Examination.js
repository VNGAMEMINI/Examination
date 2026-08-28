import SubjectCollection
  from "../subject/SubjectCollection.js";

import Settings
  from "../settings/Settings.js";

class Examination {
  #id;
  #title;
  #subjects;
  #settings;
  #metadata;

  constructor({
    id = null,
    title = "",
    subjects = new SubjectCollection(),
    settings = new Settings(),
    metadata = {}
  } = {}) {
    if (!(subjects instanceof SubjectCollection)) {
      throw new TypeError(
        "Examination subjects must be a SubjectCollection"
      );
    }

    if (!(settings instanceof Settings)) {
      throw new TypeError(
        "Examination settings must be a Settings"
      );
    }

    this.#id = id;
    this.#title = title;
    this.#subjects = subjects;
    this.#settings = settings;
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

  get settings() {
    return this.#settings;
  }

  get metadata() {
    return this.#metadata;
  }
}

export default Examination;
