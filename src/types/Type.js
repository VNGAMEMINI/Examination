class Type {
  static SINGLE = "single";
  static MULTIPLE = "multiple";
  static BOOLEAN = "boolean";
  static TEXT = "text";

  #value;

  constructor(value) {
    if (!Type.values().includes(value)) {
      throw new TypeError(`Invalid question type: ${value}`);
    }

    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  static values() {
    return [Type.SINGLE, Type.MULTIPLE, Type.BOOLEAN, Type.TEXT];
  }
}

export default Type;
