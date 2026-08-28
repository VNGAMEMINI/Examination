import Mode from "./Mode.js";

class Settings {
  #mode;
  #limit;
  #randomSen;
  #randomAns;
  #autoNext;
  #timeTotal;

  constructor({
    mode = Mode.FREE,
    limit = 0,
    randomSen = false,
    randomAns = false,
    autoNext = true,
    timeTotal = 0,
  } = {}) {
    this.#mode = mode instanceof Mode ? mode : new Mode(mode);

    if (!Number.isInteger(limit) || limit < 0) {
      throw new TypeError("Settings limit must be a non-negative integer");
    }

    if (!Number.isInteger(timeTotal) || timeTotal < 0) {
      throw new TypeError("Settings timeTotal must be a non-negative integer");
    }

    if (typeof randomSen !== "boolean") {
      throw new TypeError("Settings randomSen must be a boolean");
    }

    if (typeof randomAns !== "boolean") {
      throw new TypeError("Settings randomAns must be a boolean");
    }

    if (typeof autoNext !== "boolean") {
      throw new TypeError("Settings autoNext must be a boolean");
    }

    this.#limit = limit;
    this.#randomSen = randomSen;
    this.#randomAns = randomAns;
    this.#autoNext = autoNext;
    this.#timeTotal = timeTotal;
  }

  get mode() {
    return this.#mode;
  }

  get limit() {
    return this.#limit;
  }

  get randomSen() {
    return this.#randomSen;
  }

  get randomAns() {
    return this.#randomAns;
  }

  get autoNext() {
    return this.#autoNext;
  }

  get timeTotal() {
    return this.#timeTotal;
  }
}

export default Settings;
