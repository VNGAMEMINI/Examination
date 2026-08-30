class ExaminationError extends Error {
  constructor(message, options = {}) {
    super(message, options);

    this.name = "ExaminationError";

    if (options.code !== undefined) {
      this.code = options.code;
    }
  }
}

export default ExaminationError;
