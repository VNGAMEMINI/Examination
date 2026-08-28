import Compare from "./Compare.js";

class ObjectCompare extends Compare {
  static equal(a, b) {
    if (
      a === null ||
      b === null ||
      typeof a !== "object" ||
      typeof b !== "object"
    ) {
      return false;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every(
      key =>
        Object.prototype.hasOwnProperty.call(b, key) &&
        a[key] === b[key]
    );
  }
}

export default ObjectCompare;

