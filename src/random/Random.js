class Random {
  static number(min = 0, max = 1) {
    if (
      typeof min !== "number" ||
      typeof max !== "number" ||
      Number.isNaN(min) ||
      Number.isNaN(max)
    ) {
      throw new TypeError(
        "Random number bounds must be numbers"
      );
    }

    if (min > max) {
      throw new RangeError(
        "Random minimum cannot be greater than maximum"
      );
    }

    return Math.random() * (max - min) + min;
  }

  static integer(min = 0, max = 1) {
    if (
      !Number.isInteger(min) ||
      !Number.isInteger(max)
    ) {
      throw new TypeError(
        "Random integer bounds must be integers"
      );
    }

    if (min > max) {
      throw new RangeError(
        "Random minimum cannot be greater than maximum"
      );
    }

    return Math.floor(
      Math.random() * (max - min + 1)
    ) + min;
  }

  static pick(array) {
    if (!Array.isArray(array)) {
      throw new TypeError(
        "Random pick expects an array"
      );
    }

    if (array.length === 0) {
      return undefined;
    }

    return array[
      Random.integer(0, array.length - 1)
    ];
  }
}

export default Random;
