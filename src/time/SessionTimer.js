class SessionTimer {
  #duration;
  #startedAt;
  #stoppedAt;

  constructor(duration = 0, { startedAt = null, stoppedAt = null } = {}) {
    if (!Number.isInteger(duration) || duration < 0) {
      throw new TypeError(
        "SessionTimer duration must be a non-negative integer",
      );
    }

    if (startedAt !== null && !Number.isFinite(startedAt)) {
      throw new TypeError(
        "SessionTimer startedAt must be a finite number or null",
      );
    }

    if (stoppedAt !== null && !Number.isFinite(stoppedAt)) {
      throw new TypeError(
        "SessionTimer stoppedAt must be a finite number or null",
      );
    }

    if (startedAt === null && stoppedAt !== null) {
      throw new TypeError("SessionTimer stoppedAt requires startedAt");
    }

    if (startedAt !== null && stoppedAt !== null && stoppedAt < startedAt) {
      throw new RangeError("SessionTimer stoppedAt cannot be before startedAt");
    }

    this.#duration = duration;
    this.#startedAt = startedAt;
    this.#stoppedAt = stoppedAt;
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

  toJSON() {
    return {
      duration: this.#duration,
      startedAt: this.#startedAt,
      stoppedAt: this.#stoppedAt,
    };
  }

  static fromJSON(data) {
    if (data == null || typeof data !== "object" || Array.isArray(data)) {
      throw new TypeError("SessionTimer.fromJSON expects a data object");
    }

    return new SessionTimer(data.duration ?? 0, {
      startedAt: data.startedAt ?? null,
      stoppedAt: data.stoppedAt ?? null,
    });
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
