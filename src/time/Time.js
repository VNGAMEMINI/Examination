class Time {
  #seconds;

  constructor(seconds = 0) {
    if (typeof seconds !== "number" || !Number.isFinite(seconds)) {
      throw new TypeError("Time seconds must be a finite number");
    }

    if (seconds < 0) {
      throw new RangeError("Time seconds cannot be negative");
    }

    this.#seconds = seconds;
  }

  get seconds() {
    return this.#seconds;
  }

  get minutes() {
    return this.#seconds / 60;
  }

  get hours() {
    return this.#seconds / 3600;
  }

  toSeconds() {
    return this.#seconds;
  }

  toMinutes() {
    return this.#seconds / 60;
  }

  toHours() {
    return this.#seconds / 3600;
  }

  static seconds(value) {
    return new Time(value);
  }

  static minutes(value) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new TypeError("Time minutes must be a finite number");
    }

    return new Time(value * 60);
  }

  static hours(value) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new TypeError("Time hours must be a finite number");
    }

    return new Time(value * 3600);
  }
}

export default Time;
