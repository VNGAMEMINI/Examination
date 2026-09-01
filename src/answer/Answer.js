export default class Answer {
  #id;
  #text;
  #metadata;

  constructor({ id, text, metadata = {} }) {
    this.#id = id;
    this.#text = text;
    this.#metadata = { ...metadata };
  }

  get id() {
    return this.#id;
  }

  get text() {
    return this.#text;
  }

  get metadata() {
    return { ...this.#metadata };
  }

  toJSON() {
    return {
      id: this.#id,
      text: this.#text,
      metadata: { ...this.#metadata },
    };
  }
}
