import ExaminationError from "../errors/ExaminationError.js";

class ValidationError extends ExaminationError {
  constructor(message, options = {}) {
    super(message, options);

    this.name = "ValidationError";
  }
}

export default ValidationError;
