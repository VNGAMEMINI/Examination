import Type from "./Type.js";

import Single from "./Single.js";
import Multiple from "./Multiple.js";
import BooleanType from "./Boolean.js";
import Text from "./Text.js";

class TypeRegistry {
  #types = new Map();

  constructor() {
    this.register(Type.SINGLE, Single);
    this.register(Type.MULTIPLE, Multiple);
    this.register(Type.BOOLEAN, BooleanType);
    this.register(Type.TEXT, Text);
  }

  register(name, TypeClass) {
    if (typeof name !== "string" || name.length === 0) {
      throw new TypeError("TypeRegistry name must be a non-empty string");
    }

    if (typeof TypeClass !== "function") {
      throw new TypeError("TypeRegistry type must be a constructor");
    }

    if (!(TypeClass.prototype instanceof Type)) {
      throw new TypeError("TypeRegistry type must extend Type");
    }

    this.#types.set(name, TypeClass);

    return this;
  }

  get(name) {
    return this.#types.get(name);
  }

  has(name) {
    return this.#types.has(name);
  }

  values() {
    return [...this.#types.keys()];
  }

  create(name) {
    const TypeClass = this.#types.get(name);

    if (!TypeClass) {
      throw new TypeError(`Unknown question type: ${name}`);
    }

    return new TypeClass();
  }
}

export default TypeRegistry;
