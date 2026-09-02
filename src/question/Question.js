import Answer from "../answer/Answer.js";

export default class Question {
  #id;
  #text;
  #answers;
  #correct;
  #metadata;

  constructor({ id, text, answers = [], correct = [], metadata = {} }) {
    this.#id = id;
    this.#text = text;

    this.#answers = answers.map((answer) =>
      answer instanceof Answer ? answer : new Answer(answer),
    );

    this.#correct = [...correct];
    this.#metadata = { ...metadata };
  }

  get id() {
    return this.#id;
  }

  get text() {
    return this.#text;
  }

  get answers() {
    return [...this.#answers];
  }

  get correct() {
    return [...this.#correct];
  }

  get metadata() {
    return { ...this.#metadata };
  }

  toJSON() {
    return {
      id: this.#id,
      text: this.#text,
      answers: this.#answers.map((answer) => answer.toJSON()),
      correct: [...this.#correct],
      metadata: { ...this.#metadata },
    };
  }
}
