import ExaminationError from "./ExaminationError.js";

class SessionError extends ExaminationError {
  constructor(message, options = {}) {
    super(message, options);

    this.name = "SessionError";
  }
}

export default SessionError;
