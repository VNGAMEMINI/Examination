import Compare from "./Compare.js";

class StringCompare extends Compare {
  static equal(a, b) {
    if (typeof a !== "string" || typeof b !== "string") {
      return false;
    }

    return a === b;
  }

  static equalIgnoreCase(a, b) {
    if (typeof a !== "string" || typeof b !== "string") {
      return false;
    }

    return a.toLowerCase() === b.toLowerCase();
  }

  static trimEqual(a, b) {
    if (typeof a !== "string" || typeof b !== "string") {
      return false;
    }

    return a.trim() === b.trim();
  }
}

export default StringCompare;
