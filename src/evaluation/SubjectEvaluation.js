class SubjectEvaluation {
  #subject;
  #total;
  #correct;
  #incorrect;
  #unanswered;
  #results;
  #metadata;

  constructor({
    subject,
    total = 0,
    correct = 0,
    incorrect = 0,
    unanswered = 0,
    results = [],
    metadata = {},
  } = {}) {
    this.#subject = subject;
    this.#total = total;
    this.#correct = correct;
    this.#incorrect = incorrect;
    this.#unanswered = unanswered;
    this.#results = results;
    this.#metadata = metadata;
  }

  get subject() {
    return this.#subject;
  }

  get total() {
    return this.#total;
  }

  get correct() {
    return this.#correct;
  }

  get incorrect() {
    return this.#incorrect;
  }

  get unanswered() {
    return this.#unanswered;
  }

  get results() {
    return this.#results;
  }

  get metadata() {
    return this.#metadata;
  }

  toJSON() {
    return {
      subject: this.#subject,
      total: this.#total,
      correct: this.#correct,
      incorrect: this.#incorrect,
      unanswered: this.#unanswered,
      results: this.#results,
      metadata: this.#metadata,
    };
  }
}

export default SubjectEvaluation;
