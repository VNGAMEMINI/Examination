import SubjectCollection from "../subject/SubjectCollection.js";
import Settings from "../settings/Settings.js";

import normalizeSubjectCollection from "../data/normalizeSubjectCollection.js";

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
    metadata = {},
  } = {}) {
    if (!(subjects instanceof SubjectCollection)) {
      throw new TypeError("Examination subjects must be a SubjectCollection");
    }

    if (!(settings instanceof Settings)) {
      throw new TypeError("Examination settings must be a Settings");
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

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      subjects: this.#subjects.toArray(),
      settings: {
        mode: this.#settings.mode.value,
        limit: this.#settings.limit,
        randomSen: this.#settings.randomSen,
        randomAns: this.#settings.randomAns,
        autoNext: this.#settings.autoNext,
        timeTotal: this.#settings.timeTotal,
      },
      metadata: this.#metadata,
    };
  }

  static fromJSON(data) {
    if (data === null || typeof data !== "object" || Array.isArray(data)) {
      throw new TypeError("Examination.fromJSON expects an object");
    }

    const subjects =
      data.subjects instanceof SubjectCollection
        ? data.subjects
        : normalizeSubjectCollection(data.subjects ?? []);

    const settings =
      data.settings instanceof Settings
        ? data.settings
        : new Settings(data.settings ?? {});

    return new Examination({
      id: data.id ?? null,
      title: data.title ?? "",
      subjects,
      settings,
      metadata: data.metadata ?? {},
    });
  }
}

export default Examination;
