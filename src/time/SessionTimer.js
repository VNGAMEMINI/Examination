class SessionTimer {
  #duration;
  #startedAt;
  #stoppedAt;

  constructor(duration = 0) {
    if (!Number.isInteger(duration) || duration < 0) {
      throw new TypeError(
        "SessionTimer duration must be a non-negative integer",
      );
    }

    this.#duration = duration;
    this.#startedAt = null;
    this.#stoppedAt = null;
  }

  start() {
    if (this.started) {
      return this;
    }

    this.#startedAt = Date.now();
    this.#stoppedAt = null;

    return this;
  }

  stop() {
    if (!this.started || this.stopped) {
      return this;
    }

    this.#stoppedAt = Date.now();

    return this;
  }

  reset() {
    this.#startedAt = null;
    this.#stoppedAt = null;

    return this;
  }

  get duration() {
    return this.#duration;
  }

  get started() {
    return this.#startedAt !== null;
  }

  get stopped() {
    return this.#stoppedAt !== null;
  }

  get elapsed() {
    if (!this.started) {
      return 0;
    }

    const end = this.#stoppedAt ?? Date.now();

    return Math.min(
      Math.max(0, Math.floor((end - this.#startedAt) / 1000)),
      this.#duration,
    );
  }

  get remaining() {
    return Math.max(0, this.#duration - this.elapsed);
  }

  get expired() {
    return this.remaining === 0 && this.started;
  }
}

export default SessionTimer;
