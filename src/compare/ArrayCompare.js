import Compare from "./Compare.js";

class ArrayCompare extends Compare {
  static equal(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      return false;
    }

    if (a.length !== b.length) {
      return false;
    }

    return a.every((value, index) => value === b[index]);
  }

  static equalUnordered(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      return false;
    }

    if (a.length !== b.length) {
      return false;
    }

    const remaining = [...b];

    for (const value of a) {
      const index = remaining.indexOf(value);

      if (index === -1) {
        return false;
      }

      remaining.splice(index, 1);
    }

    return true;
  }
}

export default ArrayCompare;
