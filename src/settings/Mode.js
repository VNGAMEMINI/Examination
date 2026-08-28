class Mode {
  static FREE = "free";
  static EXAM = "exam";

  #value;

  constructor(value) {
    if (!Mode.values().includes(value)) {
      throw new TypeError(`Invalid mode: ${value}`);
    }

    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  static values() {
    return [Mode.FREE, Mode.EXAM];
  }
}

export default Mode;
